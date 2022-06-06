exports.handler = async function (event) {
    console.log("REQUEST: " + JSON.stringify(event, undefined, 2));
    return {
        statusCode: 200,
        headers: { "Content-Type": "text/plain"},
        body:`Hello Dude and Good afternoon! You have hit ${event.path}\n`
    };
}