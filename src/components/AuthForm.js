// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/Form.css";
// import { auth,  ref, set, db } from "../utils/fireBase";
// import {
//   createUserWithEmailAndPassword,
//   // signInWithEmailAndPassword,
//   updateProfile,
// } from "firebase/auth";

// const AuthForm = ({ setIsLoggedIn }) => {
//   const navigate = useNavigate();
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { email, password, firstName } = formData;

   
//     try {
//       if (isLogin) {
//         // Firebase Login
//         localStorage.setItem('isLoggedIn', true)
//         setIsLoggedIn(true);
//         navigate("/home");
//       } else {
//         // Firebase Registration
//         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//         const user = userCredential.user;
    
//         // Update display name in Firebase Auth
//         await updateProfile(user, {
//           displayName: firstName,
//         });
    
//         // Save user data to Realtime Database
//         await set(ref(db, `users/${user.uid}`), {
//           uid: user.uid,
//           name: firstName,
//           email: email,
//           isLoggedIn: true
//         });
    
//         alert("Registration successful!");
//         localStorage.setItem('isLoggedIn', true)
//         setIsLoggedIn(true);
//         navigate("/home");
        
//         setFormData({ firstName: "", email: "", password: "" });
//       }
//     } catch (error) {
//       console.error("Auth error:", error.message);
//       alert(error.message);
//     }
    
//   };

//   return (
//     <div className="bg-setup">
//       <div className="form-container">
//         <h2>{isLogin ? "Login" : "Register"}</h2>
//         <form onSubmit={handleSubmit}>
//           {!isLogin && (
//             <input
//               type="text"
//               name="firstName"
//               placeholder="Name"
//               value={formData.firstName}
//               onChange={handleChange}
//               required
//             />
//           )}
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           <button type="submit">{isLogin ? "Login" : "Register"}</button>
//         </form>

//         <p className="toggle-text">
//           {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
//           <span className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
//             {isLogin ? "Register here" : "Login here"}
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AuthForm;
  

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/Form.css";
// import { auth, ref, set, db } from "../utils/fireBase";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   updateProfile,
// } from "firebase/auth";
// import { useFormik } from "formik";
// import * as Yup from "yup";

// const AuthForm = ({ setIsLoggedIn }) => {
//   const navigate = useNavigate();
//   const [isLogin, setIsLogin] = useState(true);

//   const formik = useFormik({
//     initialValues: {
//       firstName: "",
//       email: "",
//       password: "",
//     },
//     validationSchema: Yup.object({
//       firstName: !isLogin
//         ? Yup.string().required("Name is required")
//         : Yup.string(),
//       email: Yup.string().email("Invalid email").required("Email is required"),
//       password: Yup.string()
//         .min(6, "Password must be at least 6 characters")
//         .required("Password is required"),
//     }),
//     onSubmit: async (values, { resetForm }) => {
//       const { email, password, firstName } = values;

//       try {
//         if (isLogin) {
//           // Firebase Login
//           const userCredential = await signInWithEmailAndPassword(
//             auth,
//             email,
//             password
//           );
//           localStorage.setItem("isLoggedIn", true);
//           setIsLoggedIn(true);
//           navigate("/home");
//         } else {
//           // Firebase Registration
//           const userCredential = await createUserWithEmailAndPassword(
//             auth,
//             email,
//             password
//           );
//           const user = userCredential.user;

//           await updateProfile(user, {
//             displayName: firstName,
//           });

//           await set(ref(db, `users/${user.uid}`), {
//             uid: user.uid,
//             name: firstName,
//             email: email,
//             isLoggedIn: true,
//           });

//           alert("Registration successful!");
//           localStorage.setItem("isLoggedIn", true);
//           setIsLoggedIn(true);
//           navigate("/home");
//           resetForm();
//         }
//       } catch (error) {
//         console.error("Auth error:", error.message);
//         alert(error.message);
//       }
//     },
//   });

//   return (
//     <div className="bg-setup">
//       <div className="form-container">
//         <h2>{isLogin ? "Login" : "Register"}</h2>
//         <form onSubmit={formik.handleSubmit}>
//           {!isLogin && (
//             <>
//               <input
//                 type="text"
//                 name="firstName"
//                 placeholder="Name"
//                 value={formik.values.firstName}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//               />
//               {formik.touched.firstName && formik.errors.firstName && (
//                 <div className="error">{formik.errors.firstName}</div>
//               )}
//             </>
//           )}
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formik.values.email}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//           />
//           {formik.touched.email && formik.errors.email && (
//             <div className="error">{formik.errors.email}</div>
//           )}
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formik.values.password}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//           />
//           {formik.touched.password && formik.errors.password && (
//             <div className="error">{formik.errors.password}</div>
//           )}
//           <button type="submit">{isLogin ? "Login" : "Register"}</button>
//         </form>

//         <p className="toggle-text">
//           {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
//           <span className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
//             {isLogin ? "Register here" : "Login here"}
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AuthForm;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Form.css";
import { auth, ref, set, db } from "../utils/fireBase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useFormik } from "formik";
import * as Yup from "yup";

const AuthForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const validationSchema = Yup.object({
    firstName: !isLogin
      ? Yup.string()
          .matches(/^[A-Za-z]+$/, "Name must contain only letters")
          .min(3, "Name must be at least 3 characters")
          .required("Name is required")
      : Yup.string(),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(/[0-9]/, "Must contain at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/, "Must contain at least one special character")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const { email, password, firstName } = values;

      try {
        if (isLogin) {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          localStorage.setItem("isLoggedIn", true);
          setIsLoggedIn(true);
          navigate("/home");
        } else {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;

          await updateProfile(user, {
            displayName: firstName,
          });

          await set(ref(db, `users/${user.uid}`), {
            uid: user.uid,
            name: firstName,
            email: email,
            isLoggedIn: true,
          });

          alert("Registration successful!");
          localStorage.setItem("isLoggedIn", true);
          setIsLoggedIn(true);
          navigate("/home");
          resetForm();
        }
      } catch (error) {
        console.error("Auth error:", error.message);
        alert(error.message);
      }
    },
  });

  return (
    <div className="bg-setup">
      <div className="form-container">
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={formik.handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                name="firstName"
                placeholder="Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <div className="error">{formik.errors.firstName}</div>
              )}
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error">{formik.errors.email}</div>
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="error">{formik.errors.password}</div>
          )}
          <button type="submit">{isLogin ? "Login" : "Register"}</button>
        </form>

        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Register here" : "Login here"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
