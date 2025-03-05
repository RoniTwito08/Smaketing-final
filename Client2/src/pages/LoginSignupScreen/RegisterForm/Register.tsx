import React from "react";
import styles from "./Register.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import "boxicons/css/boxicons.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerUser } from "../api";

type FormInputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("הסיסמאות אינן תואמות");
      return;
    }

    try {
      const userData = await registerUser(data.email, data.password);
      console.log("User Registered:", userData);
      toast.success("נרשמת בהצלחה! כעת תוכל להתחבר.");
    } catch (error) {
      console.log("Register Error:", error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "שגיאה בהרשמה, נסה שוב");
      } else {
        toast.error("שגיאה בהרשמה, נסה שוב");
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <ToastContainer />
      <h1>הרשמה</h1>

      <div className={styles.inputBox}>
        <input
          type="text"
          placeholder="שם משתמש"
          {...register("username", { required: true, minLength: 3 })}
        />
        <i className="bx bx-user"></i>
      </div>

      <div className={styles.inputBox}>
        <input
          type="email"
          placeholder="מייל"
          {...register("email", { required: true })}
        />
        <i className="bx bx-envelope"></i>
      </div>

      <div className={styles.inputBox}>
        <input
          type="password"
          placeholder="סיסמה"
          {...register("password", { required: true, minLength: 6 })}
        />
        <i className="bx bxs-lock-alt"></i>
      </div>

      <div className={styles.inputBox}>
        <input
          type="password"
          placeholder="אימות סיסמה"
          {...register("confirmPassword", { required: true })}
        />
        <i className="bx bxs-lock-alt"></i>
      </div>

      <button type="submit" className={styles.btn}>
        הרשמה
      </button>
    </form>
  );
};

export default RegisterForm;
