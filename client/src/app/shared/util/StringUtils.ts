export class StringUtils {
    static fetchName(name: string): string {
        if (name.includes('Alchemy')) {
            return 'Alchemy';
        } else if (name.includes('Art Series')) {
            return 'Art Series';
        } else if (name.includes('Commander')) {
            return 'Commander';
        } else if (name.includes('Promos')) {
            return 'Promos';
        } else if (name.includes('Tokens')) {
            return 'Tokens';
        } else if (name.includes('Artifact')) {
            return 'Artifacts';
        } else {
            return name;
        }
    }

    // TODO:
    /* static fetchName(string: string, wantedValue: string): string {
     *  if (string.includes(wantedValue)) {
     *     return string wantedValue;
     */
}
