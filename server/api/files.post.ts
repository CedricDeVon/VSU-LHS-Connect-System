
interface File {
    name: string
    content: string
}

export default defineEventHandler(async (event) => {
    const { files } = await readBody<{ files: File[] }>(event)

    for ( const file of files ) {
        // await storeFileLocally(
        //     file,         // the file object
        //     8,            // you can add a name for the file or length of Unique ID that will be automatically generated!
        //     '/userFiles'  // the folder the file will be stored in
        // )
        const { binaryString, ext } = parseDataUrl(file.content)
        if (ext !== 'csv') {
            return 'failure!';
        }
        console.log(file);
        console.log(file.content);
        console.log(binaryString);
        console.log(Buffer.from(binaryString.toString('base64'), 'base64').toString('ascii').split('\n'));
    }

    return 'success!';
});
