import Stack from "@mui/system/Stack";
import ContactCard from "./ContactCard";
import ContactForm from "./ContantForm";

const ContactUs = () => {
  return (
    <>
      <Stack
        direction={{ md: "row", xs: "column" }}
        sx={{
          padding: {
            lg: "25px 80px 86px 94px",
            md: "25px 25px 86px 50px",
            sm: "40px 20px 50px 20px",
            xs: "40px 15px 50px 15px",
          },
          display: "flex",
          justifyContent: "space-between",
          gap: "35px",
        }}
      >
        <ContactForm />

        <ContactCard />
      </Stack>
    </>
  );
};

export default ContactUs;
