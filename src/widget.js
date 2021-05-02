const widgetProperties = [
    "id",
    "componentName",
    "configurable",
    "materialIcon",
    "title",
    "subtitle",
    "properties"
];

export default class Widget {
    constructor(information) {
        const properties = Object.keys(information)
        for (const prop of properties) {
            if (!widgetProperties.includes(prop)) {
                throw `La propriété ${prop} n'existe pas.`;
            }
            this[prop] = information[prop];
        }

        // Si des propriétés n'ont pas été renseignées,
        // On les initialise à null et on scèle l'objet
        const missingProps = widgetProperties.filter(prop => !properties.includes(prop));
        for (const missingProp of missingProps) {
            this[missingProp] = null;
        }
        Object.seal(this);
    }
}