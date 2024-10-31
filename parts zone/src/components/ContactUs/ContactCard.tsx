import { contactBox } from "@/constant/data";
import Typography from "@mui/material/Typography";
import Stack from "@mui/system/Stack";
import Image from "next/image";
import Link from "next/link";
import FormButton from "../FormButton";

const ContactCard = () => {
  return (
    <Stack
      direction={"row"}
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Stack
        direction={"column"}
        sx={{
          width: "439px",
          maxWidth: "439px",
          display: "flex",
          gap: { sm: "30px", xs: "20px" },
        }}
      >
        <Stack
          sx={{
            borderRadius: "8px",
            height: { sm: "190px", xs: "160px" },
            padding: {
              sm: "20px 35px 0px  20px ",
              xs: "20px 14px 0px  20px",
            },
            border: "1px solid var(--light-grey)",
          }}
        >
          <Typography
            sx={{
              color: "var(--text-heading)",
              fontSize: { sm: "16px", xs: "14px" },
              fontStyle: "normal",
              fontWeight: "700",
              lineHeight: "200%",
            }}
          >
            NINGBO GRAND AUTO PARTS CO., LTD
          </Typography>
          <Typography
            sx={{
              marginTop: "10px",
              color: "var( --text-grey)",
              fontSize: { sm: "14px", xs: "12px" },
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "200%",
            }}
          >
            Royal Palace No. 777 Canghai Road, Yinzhou District, Ningbo 315000
            China.
          </Typography>
          <Typography
            sx={{
              color: "var( --text-grey)",
              fontSize: { sm: "14px", xs: "12px" },
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "200%",
              span: {
                color: "var(--dark-blue)",
                fontWeight: "700",
                textDecoration: "underline",
              },
            }}
          >
            Email:
            <Link href="mailto:info@grandautoparts.net">
              <span>info@grandautoparts.net</span>
            </Link>
          </Typography>
        </Stack>

        {contactBox.map((data, index) => (
          <Stack
            key={index}
            sx={{
              borderRadius: "8px",
              height: { sm: "190px", xs: "160px" },
              padding: {
                sm: "20px 35px 0px  20px ",
                xs: "20px 14px 0px  20px",
              },
              border: "1px solid var(--light-grey)",
            }}
          >
            <Stack
              direction={"row"}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Image
                src={"/contactPhone.svg"}
                width={30}
                height={30}
                quality={100}
                alt={"alt"}
                priority
              />
              <Typography
                sx={{
                  color: "var(--text-heading)",
                  fontSize: { sm: "16px", xs: "14px" },
                  fontStyle: "normal",
                  fontWeight: "700",
                  lineHeight: "200%",
                }}
              >
                {data.name}
              </Typography>
            </Stack>

            <Typography
              sx={{
                marginTop: "10px",
                color: "var( --text-grey)",
                fontSize: { sm: "14px", xs: "12px" },
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "200%",
              }}
            >
              {data.desc}
            </Typography>
            <Typography
              sx={{
                color: "var( --text-grey)",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "200%",
                span: {
                  color: "var(--dark-blue)",
                  fontWeight: "700",
                  textDecoration: "underline",
                },
              }}
            >
              <Link href={data.link}>
                <span> {data.info}</span>
              </Link>
            </Typography>
          </Stack>
        ))}

        <Stack
          sx={{
            borderRadius: "8px",
            height: { sm: "190px", xs: "160px" },
            padding: {
              sm: "20px 35px 0px  20px ",
              xs: "20px 14px 0px  20px",
            },
            border: "1px solid var(--light-grey)",
          }}
        >
          <Stack
            direction={"row"}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Image
              src={"/contactChat.svg"}
              width={30}
              height={30}
              quality={100}
              alt={"alt"}
              priority
            />
            <Typography
              sx={{
                color: "var(--text-heading)",
                fontSize: { sm: "16px", xs: "14px" },
                fontStyle: "normal",
                fontWeight: "700",
                lineHeight: "200%",
              }}
            >
              LIVE CHAT
            </Typography>
          </Stack>

          <Typography
            sx={{
              marginTop: "10px",
              color: "var(--text-grey)",
              fontSize: { sm: "14px", xs: "12px" },
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "200%",
            }}
          >
            Representative and get all the assistance that you need
          </Typography>
          <Stack
            direction={"row"}
            sx={{
              marginTop: { sm: "30px", xs: "27px" },
              display: "flex",
              justifyContent: "center",
            }}
          >
            <FormButton
              sx={{
                width: { sm: "148px", xs: "100%" },
                fontSize: { sm: "20px", xs: "15px" },
                padding: "15px",
              }}
              type="button"
              name="Chat Now"
            />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ContactCard;
