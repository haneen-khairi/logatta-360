// pages/multiStepForm.js
import AuthCard from "@/Components/UI/AuthCard";
import SiteImage from "@/Components/UI/SiteImage";
import InputField from "@/Components/fields/InputField";
import SelectMenuField from "@/Components/fields/SelectField";
import { AxiosHeadersInstance } from "@/Functions/AxiosHeadersInstance";
import { AxiosInstance } from "@/Functions/AxiosInstance";
import { emailRegex, passwordRegex } from "@/Functions/RegexFunction";
import MainLayout from "@/Layouts/MainLayout";
import { useSnackbar } from "@/custom-hooks/useSnackbar";
import { Button, Radio, RadioGroup } from "@nextui-org/react";
import { steps } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function index() {
  const showSnackbar = useSnackbar()
  const {
    register,
    handleSubmit,
    reset,
    setError,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  const selectedUniversity = watch('university_id');
  const otherInput = watch('other');
  const route = useRouter();
  const userEmail = useRef("");
  const [countries, setCountries] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [educationConcerns, setEducationConcerns] = useState([]);
  const [step, setStep] = useState(1);
  const [token, setToken] = useState({
    access_token: "",
  });
  const [validations, setValidations] = useState([]);
  const [otherQuestion, setOtherQuestion] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const password = watch("password", "");



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  async function getCountries() {
    try {
      const { data } = await AxiosHeadersInstance(
        `get`,
        `${process.env.NEXT_PUBLIC_API_KEY}/account/countries`
      );
      let countries = data.map((country) => {
        country.value = country.id;
        return country;
      });

      setCountries(countries);
    } catch (error) {
      console.log("=== error tests ===", error);
    }
  }
  async function getUniversities() {
    try {
      const { data } = await AxiosHeadersInstance(
        `get`,
        `${process.env.NEXT_PUBLIC_API_KEY}/tests/universities/`
      );
      let universitys = data.map((university) => {
        university.value = university.id;
        return university;
      });
      console.log('=== universitys ===', universitys)
      setUniversities(universitys);
    } catch (error) {
      console.log("=== error tests ===", error);
    }
  }
  async function getEducationalConcerns() {
    try {
      const { data } = await AxiosHeadersInstance(
        `get`,
        `${process.env.NEXT_PUBLIC_API_KEY}/tests/educational-concerns`
      );
      let concerns = data.map((concern) => {
        concern.value = concern.id;
        return concern;
      });
      console.log('=== universitys ===', concerns)
      setEducationConcerns(concerns);
    } catch (error) {
      console.log("=== error tests ===", error);
    }
  }
  function resendCode() {
    console.log("===code===");
  }
  const validationStep1 = {
    full_name: { required: "Full name is required" },
    phone: { required: "Phone is required" },
    email: {
      required: "Email is required",
      pattern: {
        value: emailRegex,
        // Change this regex pattern as needed
        message: "Email is invalid",
      },
    },
    password: {
      required: "Password is required",
      pattern: {
        value: passwordRegex,
        // Change this regex pattern as needed
        message: "Minimum 6 characters, at least one number, and special character",
      },
    },
    confirmPassword: {
      required: "Confirm password is required",
      pattern: {
        value: passwordRegex,
        // Change this regex pattern as needed
        message: "Minimum 6 characters, at least one number, and special character",
      },
      validate: (value) => value === password || "Passwords do not match",
    },
    // Add more validation rules for other input fields as needed
  };
  function submitSteps(data) {
    console.log("=== data steps ===", data);
    localStorage.setItem('step', step)
    if (step === 1) {
      console.log("=== step1 ===", data);
      data.country_code = "+964";
      userEmail.current = data.email;
      createAccount(data);
    } else if (step === 2) {
      const verification_code = Object.keys(data)
        .filter((key) => key.startsWith("number")) // Filter keys that start with 'number'
        .sort() // Optional: Sort the keys if they might not be in order
        .map((key) => data[key]) // Map to their corresponding values
        .join(""); // Join the values into a string

      console.log("=== number ===", +verification_code);
      // const verification_code = parseInt(Object.values(data).join(''));
      console.log("=== step2 ===", data);

      verifyAccount(verification_code);
    } else if (step === 3) {
      console.log("=== step3 ===", data);
      const fd = new FormData();
      fd.append("profile_picture", data.image[0]);
      fd.append("gender", data.gender);
      fd.append("date_of_birth", data.date_of_birth);
      fd.append("country", data.country);
      additionalInfoAccount(fd);
      setStep(step + 1);
    } else if (step === 6) {
      if (!selectedUniversity && !otherInput) {
        setError('university_id', { type: 'manual', message: 'Please select a university or specify "other".' });
        setError('other', { type: 'manual', message: 'Please specify or select a university.' });
        return;
      }
      submitQuestions(data)
      console.log("=== data ===", data);
    } else{
      setStep(step + 1);
    }
  }
  function onChangeConcernEducation(event) {
    const { value } = event.target;
    console.log('=== value ===', value)
    if (value == 4) {
      setOtherQuestion(true);
      console.log('=== true ===')

    } else {
      setOtherQuestion(false);
    }
  }
  async function createAccount(data) {
    try {
      const accountRes = await AxiosInstance(
        `post`,
        `${process.env.NEXT_PUBLIC_API_KEY}/account/sign-up/`,
        {},
        {},
        data
      );
      console.log("=== createAccount response ===", accountRes);
      setStep(step + 1);
    } catch (error) {
      console.log("=== error in creating ===", error);
    }
  }
  async function verifyAccount(data) {
    try {
      const accountRes = await AxiosInstance(
        `post`,
        `${process.env.NEXT_PUBLIC_API_KEY}/account/verify-sign-up/`,
        {},
        {},
        {
          email: userEmail.current,
          verification_code: data,
        }
      );
      if (accountRes.status) {
        const tokenData = { ...token };
        tokenData.access_token = accountRes.data.access;
        setToken(tokenData);
        setStep(step + 1);
      }
      console.log("=== verifyAccount response ===", accountRes);
    } catch (error) {
      console.log("=== error in verifying ===", error);
    }
  }
  async function additionalInfoAccount(data) {
    try {
      const accountRes = await AxiosInstance(
        `put`,
        `${process.env.NEXT_PUBLIC_API_KEY}/account/info/update/`,
        { Authorization: `Bearer ${token.access_token}` },
        {},
        data
      );
      console.log("=== additionalInfoAccount response ===", accountRes);
      if (accountRes.status) {
        localStorage.setItem("token", token.access_token);
        // route.push('/')
        reset()
        setStep(step + 1);
        showSnackbar('User created successfully now answer questions', 'success')
      }else{
        showSnackbar(accountRes.error, 'error')

      }
    } catch (error) {
      console.log("=== error in verifying ===", error);
    }
  }
  async function submitQuestions(data){
    let answers;
    if(data.other === ""){
      answers = {
        educational_concerns_ids: [data.educational_concerns_ids],
        university_id: data.university_id,
        year_or_grade: data.year_or_grade,
        custom_concern: data.custom_concern || "",
      }

    }else{
      answers = {
        educational_concerns_ids: [data.educational_concerns_ids],
        year_or_grade: data.year_or_grade,
        custom_concern: data.custom_concern || "",
        custom_university: data.other,
      }
    }
    // try {
    //   const questionResponse = await AxiosHeadersInstance(
    //     `post`,
    //     `${process.env.NEXT_PUBLIC_API_KEY}/tests/get-started-test/`,
    //     {},
    //     {},
    //     answers
    //   );
    //   if (questionResponse.status) {
    //     route.push('/')
    //     reset()
    //     setStep(step + 1);
    //     showSnackbar('Questions submitted successfully', 'success')
    //   }else{
    //     showSnackbar(questionResponse.error, 'success')

    //   }
    //   console.log("=== additionalInfoAccount response ===", questionResponse);
    // } catch (error) {
    //   console.log("=== error in verifying ===", error);
    // }
    console.log('=== submitQuestions ===', data)
    console.log('=== object ===', answers)
  }

  function handleKeyUp(e, fieldName) {
    if (e.target.value.length === 1) {
      const fieldIndex = Number(fieldName.split('number')[1]);
      const nextFieldIndex = fieldIndex + 1;

      if (nextFieldIndex <= 6) {
        const nextFieldName = `number${nextFieldIndex}`;
        const nextInput = document.querySelector(`input[name="${nextFieldName}"]`);

        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  function renderSteps() {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="signup__header">Create an Account</h2>
            <p className="signup__paragraph">
              To create an account, you have to follow the required steps and
              fill the required fields
            </p>
            <InputField
              register={register}
              errors={errors}
              errorMessage={validationStep1.full_name}
              type="text"
              name="name"
              id={"name"}
              validations={validations}
              placeholder="Full Name (Required)"
              onChange={handleChange}
            />
            <InputField
              register={register}
              errors={errors}
              errorMessage={validationStep1.phone}
              type="number"
              name="phone_number"
              id={"phone_number"}
              validations={validations}
              placeholder="Phone Number (Required)"
              onChange={handleChange}
            />

            <InputField
              register={register}
              errors={errors}
              errorMessage={validationStep1.email}
              type="email"
              name="email"
              validations={validations}
              placeholder="Email Address (Required)"
              onChange={handleChange}
            />
            <InputField
              register={register}
              errors={errors}
              errorMessage={validationStep1.password}
              type="password"
              name="password"
              id={"password"}
              validations={validations}
              placeholder="Password (Required)"
              onChange={handleChange}
            />
        <div
          className="password__message flex items-center justify-start gap-[8px] mb-[24px]"
        >
          <SiteImage
            alt="exclamation mark"
            width={16}
            height={16}
            src="/assets/images/info_icon.svg"
          />

          <p className="">Minimum 6 characters, at least one number, and special chareacter</p>
        </div>
            <InputField
              register={register}
              errors={errors}
              errorMessage={validationStep1.confirmPassword}
              type="password"
              name="confirm_password"
              id={"confirm_password"}
              validations={validations}
              placeholder="Confirm Password (Required)"
              onChange={handleChange}
            />
            <div className="signup__info">
              <p>By creating an account, you agree to our <Link href={'/terms-conditions'}>terms and conditions</Link></p>
               {/* and our private policy</p> */}
            </div>
            <Button
              // disabled={Object.keys(errors).length > 0}
              disabled={!isValid}
              className="special_button signup__button"
              // onClick={nextStep}
              type="submit"
            >
              Next
            </Button>
          </div>
        );
      case 2:
        return (
          <>
            <AuthCard
              title="Verify your email"
              text="To proceed with resetting your password, please check your email and enter the code sent"
              logo={false}
            >
              {/* <form onSubmit={(e) => e.preventDefault()}> */}
              <div className="grid grid-cols-6 md:gap-x-[24px] md:gap-x-[16px]">
              {Array(6)
          .fill(null)
          .map((_, index) => (
            <Controller
            key={index}
            name={`number${index + 1}`}
            control={control}
            defaultValue=""
            rules={{ required: true, maxLength: 1 }}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                classNames={{
                  input: ["form__group--input--main"],
                  inputWrapper: ["form__group--verify"],
                }}
                placeholder=""
                onKeyUp={(e) => handleKeyUp(e, field.name)}
              />
            )}
          />
          ))} {Array(6)
          .fill(null)
          .map((_, index) => (
            <Controller
            key={index}
            name={`number${index + 1}`}
            control={control}
            defaultValue=""
            rules={{ required: true, maxLength: 1 }}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                classNames={{
                  input: ["form__group--input--main"],
                  inputWrapper: ["form__group--verify"],
                }}
                placeholder=""
                onKeyUp={(e) => handleKeyUp(e, field.name)}
              />
            )}
          />
          ))}

                {/* <InputField
                  register={register}
                  errors={errors}
                  errorMessage={{ required: true }}
                  className="verify"
                  name="number1"
                  label={""}
                  placeholder={``}
                  id={"number1"}
                  type={"text"}
                  maxLength={1}
                />
                <InputField
                  register={register}
                  errors={errors}
                  errorMessage={{ required: true }}
                  className="verify"
                  name="number2"
                  label={""}
                  placeholder={``}
                  id={"number2"}
                  type={"text"}
                  maxLength={1}
                />
                <InputField
                  register={register}
                  errors={errors}
                  errorMessage={{ required: true }}
                  className="verify"
                  name="number3"
                  label={""}
                  placeholder={``}
                  id={"number3"}
                  type={"text"}
                  maxLength={1}
                />
                <InputField
                  register={register}
                  errors={errors}
                  errorMessage={{ required: true }}
                  className="verify"
                  name="number4"
                  label={""}
                  placeholder={``}
                  id={"number4"}
                  type={"text"}
                  maxLength={1}
                />
                <InputField
                  register={register}
                  errors={errors}
                  errorMessage={{ required: true }}
                  className="verify"
                  name="number5"
                  label={""}
                  placeholder={``}
                  id={"number5"}
                  type={"text"}
                  maxLength={1}
                />
                <InputField
                  register={register}
                  errors={errors}
                  errorMessage={{ required: true }}
                  className="verify"
                  name="number6"
                  label={""}
                  placeholder={``}
                  id={"number6"}
                  type={"text"}
                  maxLength={1}
                /> */}
              </div>
              <div className="dont_have_acoount flex justify-center">
                <p>Haven’t received a code?</p>
                <Button onClick={resendCode}>
                  Resend Code{" "}
                  <SiteImage src={"/assets/images/chevron_right.svg"} />
                </Button>
              </div>
              <Button
                disabled={!isValid ? true : false}
                className="special_button w-full"
                type="submit"
              >
                Next
              </Button>
              {/* </form> */}
            </AuthCard>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="signup__header">Additional Information</h2>
            <p className="signup__paragraph">
              We need some additional information to help customize your needs
            </p>
            <div className="flex gap-[16px] items-center mb-[24px]">
              <SiteImage
                className={"w-2/12"}
                src={"/assets/images/Profile_photo_lg.svg"}
              />
              <label
                style={{ width: "80%" }}
                htmlFor="image"
                className="manage__account--dropimage"
              >
                <div className="content">
                  <h5>Profile Picture</h5>
                  <span>Click to browse or drag and drop your files</span>
                </div>
              </label>
              <div className="field relative">
                {errors.image && (
                  <div className="flex items-center justify-start gap-x-[8px] error_message">
                    <SiteImage
                      alt="exclamation mark"
                      width={16}
                      height={16}
                      src="/assets/images/error_icon.svg"
                    />

                    <p className="text-error">{errors["image"].message}</p>
                  </div>
                )}
              </div>
              <input
                // register={register}
                // errors={errors}
                {...register("image", { required: "Image is required" })}
                name="image"
                type="file"
                id="image"
                hidden
              />
            </div>
            <SelectMenuField
              register={register}
              errors={errors}
              type="text"
              name="gender"
              id={"gender"}
              items={[
                {
                  value: "M",
                  name: "Male",
                },
                {
                  value: "F",
                  name: "Female",
                },
              ]}
              validations={validations}
              placeholder="Gender (Required)"
              onChange={handleChange}
            />
            <InputField
              register={register}
              errors={errors}
              type="date"
              name="date_of_birth"
              id={"date_of_birth"}
              validations={validations}
              placeholder="Date of Birth (Required)"
              onChange={handleChange}
            />
            <SelectMenuField
              register={register}
              errors={errors}
              type="text"
              name="country"
              id={"country"}
              validations={validations}
              errorMessage={{ required: "Country is required" }}
              items={countries}
              placeholder="Country or Residence (Required)"
              onChange={handleChange}
            />
            <Button
              disabled={!isValid ? true : false}
              className="special_button w-full"
              type="submit"
            >
              Next
            </Button>
          </>
        );
      case 4:
        return (
          <>
            <h4 className="signup__header">Get Started!</h4>
            <p className="signup__paragraph">
              To help assist you better, we want to ask you a few questions
            </p>

            <h4 className="signup__content--header">
              Q1. What is your current year/grade?
            </h4>
            <InputField
              type="text"
              name="year_or_grade"
              register={register}
              errors={errors}
              validations={validations}
              errorMessage={{ required: "You need to answer this" }}
              placeholder="Your answer... (Required)"
              onChange={handleChange}
            />
            <Button
              disabled={!isValid ? true : false}
              className="special_button w-full"
              type="submit"
            >
              Next
            </Button>
          </>
        );
      case 5:
        return (
          <>
            <h4 className="signup__content--header mb-[24px]">
              Q2. What is your main educational concern
            </h4>
            {/* <Controller
            control={control}
            name="educational_concerns_ids"
            {...register('educational_concerns_ids', {
              required: 'Educational concern required'
            })}
              render={
              ()=> {
                <RadioGroup
                className="mb-[24px]"
                classNames={{
                  wrapper: "justify-center",
                }}
                orientation="horizontal"
                
                onChange={onChangeOther}
              >
                <Radio value="Studying Habits" defaultChecked>
                  Studying Habits
                </Radio>
                <Radio value="Career Choices">Career Choices</Radio>
                <Radio value="Social/Emotional">Social/Emotional</Radio>
                <Radio value="other">Other</Radio>
              </RadioGroup>
              }
            }>

            </Controller> */}
            <Controller
              control={control}
              name="educational_concerns_ids"
              defaultValue={educationConcerns[0].id}
              render={({ field: { onChange } }) => (
                <div className="grid grid-cols-3 gap-[24px]">
                  {educationConcerns.map((concern) => <p key={concern.id} className="text-left">
                    <input
                      type="radio"
                      id={`educational_concerns_${concern.id}`}
                      value={concern.id}
                      required
                      // checked={value === 'Studying-Habits'}
                      onChange={(e) => {
                        onChangeConcernEducation(e);
                        onChange(e.target.value);
                      }}
                      name="radio-group"
                      // defaultChecked
                    />
                    <label htmlFor={`educational_concerns_${concern.id}`}>{concern.concern}</label>
                  </p>)}
                </div>
              )}
            />
            {otherQuestion && (
              <div className="mt-[16px]">
                <InputField
                  register={register}
                  errors={errors}
                  name="custom_concern"
                  label={""}
                  placeholder={"Other concerns..."}
                  id={"custom_concern"}
                  type={"text"}
                  maxLength={200}
                />
                <p className="text-left">If your answer is not listed above</p>
              </div>
            )}

            <Button
              disabled={!isValid ? true : false}
              className="special_button w-full mt-[24px]"
              type="submit"
            >
              Next
            </Button>
          </>
        );
      case 6:
        return (
          <>
            <h4 className="signup__content--header mb-[24px]">
              Q3. Your School or University’s Name
            </h4>

            <SelectMenuField
              register={register}
              errors={errors}
              // errorMessage={{ required: "Gender is required" }}
              name="university_id"
              id={"university_id"}
              items={universities}
            />
            <h6 className="or">Or</h6>
            <InputField
              register={register}
              errors={errors}
              name="other"
              id={"other"}
            />
            <Button disabled={!isValid ? true : false} className="special_button w-full mt-[24px]" type="submit">
              Done
            </Button>
          </>
        );
      default:
        return null;
    }
  }
  useEffect(() => {
    if (!route.isReady) {
      return;
    }
    getEducationalConcerns()
    getUniversities()
    getCountries();
    return () => {};
  }, [route]);

  return (
    <MainLayout hideNavbar={true}>
      <Head>
        <title>{`${process.env.NEXT_PUBLIC_TITLE}Create Account`}</title>
      </Head>
      <section className="signup">
        <div className="steps">
          <div className="progress-container">
            <div
              className="progress"
              id="progress"
              style={
                step === 2
                  ? { width: "33.3333%" }
                  : step === 3
                  ? { width: "66.6667%" }
                  : step > 3
                  ? { width: "100%" }
                  : { width: "0" }
              }
            ></div>
            <div
              className={`circle ${step >= 1 ? "icon-active" : ""} ${
                step <= 1 ? "icon-last" : ""
              } ${step === 1 ? "current" : ""}`}
            >
              <div className="caption">Personal Info</div>
            </div>
            <div
              className={`circle ${step >= 2 ? "icon-active" : ""} ${
                step <= 2 ? "icon-last" : ""
              } ${step === 2 ? "current" : ""}`}
            >
              <div className="caption">Verification</div>
            </div>
            <div
              className={`circle ${step >= 3 ? "icon-active" : ""} ${
                step <= 3 ? "icon-last" : ""
              } ${step === 3 ? "current" : ""}`}
            >
              <div className="caption">Additional Info</div>
            </div>
            <div className={`circle ${step >= 4 ? "current" : ""}`}>
              <div className="caption">Get Started</div>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(submitSteps)}>{renderSteps()}</form>
      </section>
    </MainLayout>
  );
}
