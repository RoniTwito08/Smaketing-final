import { useState } from "react";
import contactStyles from "./contactUs.module.css";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        businessName: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    return (
        <section className={contactStyles.contactSection}>
            <h2 className={contactStyles.title}>📞 צור קשר</h2>
            <p className={contactStyles.description}>השאירו פרטים ונחזור אליכם בהקדם</p>
            <form className={contactStyles.contactForm} onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="fullName"
                    placeholder="שם מלא"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="אימייל"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="מספר טלפון"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="message"
                    placeholder="הודעה / שאלה (אופציונלי)"
                    value={formData.message}
                    onChange={handleChange}
                />
                <button type="submit" className={contactStyles.submitButton}>
                    📩 שלח פרטים
                </button>
            </form>
        </section>
    );
};

export default ContactUs;
