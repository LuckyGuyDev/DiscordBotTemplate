const fs = require("fs");
const path = require("path");

class PathLoader {
    /**
     * @param {Object} client 
     * @param {Object} reference
     */
    constructor(client, reference) {
        if (!(typeof reference === "object" && reference !== null && !Array.isArray(reference))) {
            throw new Error("The reference loaded to the constructor must be an Object!");
        }

        this.client = client;
        this.reference = {};
        this.reference.events = this.LoadFolderFiles(reference.events);
        this.reference.components = this.LoadFolderFiles(reference.components);
    }

    LoadFolderFiles(dirPath) {
        const output = {script:[], folder:[]};
        try {
            const files = fs.readdirSync(dirPath);
            files.forEach(file => {
                const fullPath = path.join(dirPath, file);
                if (file.endsWith(".js"))
                    output.script.push(fullPath);
                else
                    output.folder.push(fullPath);
            });
        } catch (err) {
            console.error('Error reading directory:', err.message);
        }
        return output;
    }

    LoadEvents() {
        for (const eventPath of this.reference.events.script) {
            try {
                const data = require(eventPath);
                if (data && typeof data.execute === 'function') {
                    this.client[data.activate](data.name, (...args) => data.execute(...args, this.client));
                }
            } catch (err) {
                console.error(`Error loading event ${eventPath}:`, err.message);
            }
        }
    }

    LoadComponents() {
        for (const componentPath of this.reference.components.folder) {
            const componentLocation = componentPath.split("\\").pop().toLowerCase();
            const subComponentPath = this.LoadFolderFiles(componentPath);
            for (const subPath of subComponentPath.script) {
                const component = require(subPath);
                this.client[componentLocation].set(component.name, component);
            }
        }
    }
}

module.exports = PathLoader;