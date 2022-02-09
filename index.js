const contactsActions = require("./contacts");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactsActions.listContacts();
      console.log(contacts);
      break;

    case "get":
      const contact = await contactsActions.getContactByID(id);
      if (!contact) {
        throw new Error(`Contact with id=${id} not found.`);
      }
      console.log(contact);
      break;

    case "add":
      const addedContact = await contactsActions.addContact(name, email, phone);
      console.log(addedContact);
      break;

    case "remove":
      const removedContact = await contactsActions.removeContact(id);
      if (!removedContact) {
        throw new Error(`Contact with id=${id} not found.`);
      }
      console.log(removedContact);
      break;

    default:
      console.log("Unknown action type!");
  }
}

invokeAction(argv);
