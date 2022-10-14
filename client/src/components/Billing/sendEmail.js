import emailjs from "emailjs-com";

const serviceId = "";
const templateId = "";
const userId = "";

const sendEmail = async (name , price) => {
  try {
    const response = await emailjs.send(
      "service_hdex7as",
      "template_vocaqak",
      { name , price },
      "UIYZyJWtI_U31jBBN"
    );

    if (response.status === 200) {
      console.log("Successfully sent message.");
    }
  } catch (error) {
    console.error("Failed to send email. Error: ", error);
  }
};

export default sendEmail;