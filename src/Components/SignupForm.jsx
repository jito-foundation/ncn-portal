import React from "react";
import { Link } from "react-router-dom";

const SignupForm = ({formik,loading}) => {

  return (
    <div className="signup_container">
      <div className="login_md">
        <div className="login_content">
          <div>
            <h1>Sign Up</h1>
          </div>
          <form onSubmit={formik.handleSubmit} className="login_form">
            <div>
              <input
                type="email"
                id='email'
                name='email'
                placeholder="Email"
                // required
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </div>
            {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div>:null}
            <div>
              <input
                type="password"
                id='password'
                name='password'
                placeholder="Password"
                // required
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </div>
            {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div>:null}
            <div>
              <input
                type="password"
                id='confirmPassword'
                name='confirmPassword'
                placeholder="Confirm password"
                // required
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
              />
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? <div>{formik.errors.confirmPassword}</div>:null}

            <button type="submit">{loading?'loading...':'Sign up'} </button>
          </form>
          <div className="or_link">
            <span>if you have an account</span>
            <Link className="link" to="/login">
              login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
