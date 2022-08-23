import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ILoginParams, ILoginValidation, Props } from '../model/LoginModel';
import { validateLogin, validLogin } from '../utils';
import '../../../scss/login.css';
import { useFormik } from "formik";
import * as Yup from "yup";


const LoginForm = (props: Props) => {
  const { onLogin, loading, errorMessage } = props;

  //const [formValues, setFormValues] = React.useState<ILoginParams>({ email: '', password: '', rememberMe: false });
  const [validate, setValidate] = React.useState<ILoginValidation>();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Địa chỉ email không hợp lệ"
        )
        .required("Vui lòng nhập địa chỉ email"),
      password: Yup.string()
        .min(4, "Mật khẩu tối thiểu 4 ký tự")
        .required("Vui lòng nhập mật khẩu")
    }),
    onSubmit: (values) => {
      //window.alert("Form submitted");
      // console.log(values);
    },
  });

  const onSubmit = React.useCallback(() => {
    const validate = validateLogin(formik.values);

    setValidate(validate);

    if (!validLogin(validate)) {
      return;
    }

    onLogin(formik.values);
  }, [formik.values, onLogin]);


  return (
    <form
      className="row g-3 needs-validation maxWidthFormLogin"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
        formik.handleSubmit();
      }}
    >
      {!!errorMessage && (
        <div className="alert alert-danger w100" role="alert">
          {errorMessage}
        </div>
      )}

      <div className="col-md-12">
        <label htmlFor="inputEmail" className="form-label">
          <FormattedMessage id="email" />
        </label>
        <input
          type="text"
          className="form-control"
          name="email"
          id="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        // value={formValues.email}
        // onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
        />
        {formik.errors.email && formik.touched.email && (
          <p className="errorMsg"> {formik.errors.email} </p>
        )}
        {/* {!!validate?.email && (
          <small className="text-danger">
            <FormattedMessage id={validate?.email} />
          </small>
        )} */}
      </div>

      <div className="col-md-12">
        <label htmlFor="inputPassword" className="form-label">
          <FormattedMessage id="password" />
        </label>
        <input
          type="password"
          className="form-control"
          name="password"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        // value={formValues.password}
        // onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
        />
        {formik.errors.password && formik.touched.password && (
          <p className="errorMsg"> {formik.errors.password} </p>
        )}
        {/* {!!validate?.password && (
          <small className="text-danger">
            <FormattedMessage id={validate?.password} />
          </small>
        )} */}
      </div>

      <div className="col-12">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="rememberMe"
            id="rememberMe"
            value=""
            checked={formik.values.rememberMe}
            onChange={formik.handleChange}
          // checked={formValues.rememberMe}
          // onChange={(e) => setFormValues({ ...formValues, rememberMe: !!e.target.checked })}
          />
          <label className="form-check-label" htmlFor="invalidCheck">
            <FormattedMessage id="rememberMe" />
          </label>
        </div>
      </div>

      <div className="row justify-content-md-center mg-16-0">
        <div className="col-md-auto">
          <button
            className="btn btn-primary authButton"
            type="submit"
            disabled={loading}
          >
            {loading && <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />}
            <FormattedMessage id="login" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
