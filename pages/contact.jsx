import Head from "next/head";
import Image from "next/image";
import { useContext, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

import Layout from "../components/layout/layout";

import styles from "./contact.module.css";

import {
  FormControl,
  Input,
  InputLabel,
  Paper,
  FormHelperText,
  TextField,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Button,
  Icon,
} from "@mui/material";

const Contact = (data) => {
  const { page, themeName } = useContext(ThemeContext);
  page.setPageTitle("Contact Cam");

  const [status, setStatus] = useState("");
  const [contactReason, setContactReason] = useState([]);

  const reasons = [
    "Freelance Work Opportunity",
    "Employment Opportunity",
    "Collaboration Opportunity",
    "IT Consultation",
    "Technical Assistance",
    "Other Inquiries",
  ];

  const handleReasonChange = (e) => {
    setContactReason(e.target.value);
  };

  const submitForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        setStatus("SUCCESS");
      } else {
        setStatus("ERROR");
      }
    };
    xhr.send(data);
    console.log("e", data);
  };

  return (
    <Layout nav="navbar" pageStyle="thin" logo={true} theme={themeName}>
      <Head>
        <title>
          {page.pageTitle}
          {page.siteTitle}
        </title>
      </Head>
      <section style={{ height: "200vh" }}>
        <Paper
          variant="elevation"
          style={{ borderRadius: "30px", margin: "1rem" }}
        >
          <form
            className={styles.contactForm}
            onSubmit={(e) => submitForm(e)}
            action="https://formspree.io/f/mqkgnoye"
            method="POST"
          >
            <h2 className={styles.paperHeader}>Send Me A Message!</h2>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor="name">Your Name</InputLabel>
              <Input id="name" name="name" aria-describedby="my-helper-text" />
            </FormControl>
            <br />
            <FormControl fullWidth={true}>
              <InputLabel htmlFor="organization">Organization</InputLabel>
              <Input
                id="organization"
                name="organization"
                aria-describedby="my-helper-text"
              />
              <FormHelperText id="my-helper-text">
                (If applicable)
              </FormHelperText>
            </FormControl>
            <br />
            <FormControl fullWidth={true}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                name="email"
                aria-describedby="my-helper-text"
              />
              <FormHelperText id="my-helper-text">
                Your information will never be shared
              </FormHelperText>
            </FormControl>
            <br />
            <FormControl fullWidth={true}>
              <InputLabel id="reason-label">Reason</InputLabel>
              <Select
                labelId="reason-label"
                id="reason"
                name="reason"
                value={contactReason}
                onChange={(e) => handleReasonChange(e)}
                multiple
                input={<Input />}
                inputProps={{ id: "select-reason-change" }}
                renderValue={(selected) => selected.join(", ")}
              >
                {reasons.map((reason) => (
                  <MenuItem key={reason} value={reason}>
                    <Checkbox checked={contactReason.indexOf(reason) > -1} />
                    <ListItemText primary={reason} />
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>(Select all that apply)</FormHelperText>
            </FormControl>
            <br />
            <br />
            <TextField
              id="message"
              name="message"
              label="Your Message"
              multiline
              rows={4}
              placeholder="Enter your message here"
              fullWidth={true}
            />
            {status === "SUCCESS" ? (
              <p>
                Thank for getting in touch! I`&apos`ll get back to you soon.
              </p>
            ) : (
              <div className={styles.submitButton}>
                <Button
                  id="submit"
                  name="submit"
                  type="submit"
                  variant="contained"
                  color="primary"
                  endIcon={<Icon>send</Icon>}
                  size="large"
                >
                  Send
                </Button>
              </div>
            )}
            {status === "ERROR" && (
              <p>
                Oops! There was an error. Please refresh the page and try again.
                I`&apos`d tell you to get in touch with an administrator, but
                that`&apos`s me, and getting in touch with me seems to be the
                problem.
              </p>
            )}
          </form>
        </Paper>
      </section>
    </Layout>
  );
};

export default Contact;
