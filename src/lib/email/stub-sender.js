/**
 * @typedef {Object} OutboundEmail
 * @property {string} replyTo
 * @property {string} subject
 * @property {string} text
 * @property {string} html
 * @property {import("react").ReactElement} react
 */

export function createStubSender() {
  return {
    /**
     * @param {OutboundEmail} email
     */
    async send(email) {
      console.info("[email:stub] Provider is not configured. Message was not delivered.", {
        replyTo: email.replyTo,
        subject: email.subject,
        text: email.text,
      });
      return { id: "stub", delivered: false };
    },
  };
}
