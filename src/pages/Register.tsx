import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Input from "../common/input";
import Button from "../common/button";
import { validateForm } from "../utils/validate";
import { BACKEND_URL } from "../constants/url";
import type { InputTypes } from "../types";

type Role = "buyer" | "seller";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer" as Role,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const inputs = [
    {
      label: "Full Name",
      name: "name",
      type: "text",
      placeholder: "Enter your full name",
      required: true,
    },
    {
      label: "Email address",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      required: true,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter your password",
      required: true,
    },
  ];

  const roles: Role[] = ["buyer", "seller"];

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(inputs, form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      const res = await fetch(BACKEND_URL.register, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
      });
      const data = await res.json();

      if (!data.success) {
        setErrors({ general: data.message || "Registration failed" });
        return;
      }

      login(data.data);
      navigate("/");
    } catch (err) {
      console.error(err);
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          <div className="hidden lg:block">
            <img
              src="https://images.pexels.com/photos/564094/pexels-photo-564094.jpeg"
              alt="Motorcycle"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
              Sign up
            </h2>
            <div className="flex border-gray-200 mb-6">
              {roles.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, role }))}
                  className={`flex-1 py-2 text-sm font-medium capitalize ${
                    form.role === role
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {errors.general && (
                <div className="text-red-600 text-sm mb-2">
                  {errors.general}
                </div>
              )}
              {inputs.map((input) => (
                <Input
                  key={input.name}
                  label={input.label}
                  type={input.type as InputTypes}
                  name={input.name}
                  placeholder={input.placeholder}
                  required={input.required}
                  value={form[input.name as keyof typeof form]}
                  onChange={handleChange}
                  error={errors[input.name]}
                />
              ))}
              <Button type="submit" loading={loading}>
                Create account
              </Button>
              <div className="text-center text-sm mt-2">
                <span className="text-gray-600">Already have an account? </span>
                <Link
                  to="/login"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
