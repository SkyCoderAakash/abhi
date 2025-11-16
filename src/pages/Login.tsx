import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Input from "../common/input";
import Button from "../common/button";
import { validateForm } from "../utils/validate";
import { BACKEND_URL } from "../constants/url";
import type { InputTypes } from "../types";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.returnTo || "/";

  const fields = [
    {
      label: "Email Address",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      required: true,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter password",
      required: true,
    },
  ];

  const handleInputChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(fields, form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      const res = await fetch(BACKEND_URL.login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
      });
      const data = await res.json();

      if (!data.success) {
        setErrors({ general: data.message || "Login failed" });
        return;
      }

      login(data.data);
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 min-h-screen">
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
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Sign in
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {fields.map((item) => (
                <Input
                  key={item.name}
                  label={item.label}
                  name={item.name}
                  type={item.type as InputTypes}
                  placeholder={item.placeholder}
                  required={item.required}
                  value={form[item.name as keyof typeof form]}
                  onChange={handleInputChange}
                  error={errors[item.name]}
                />
              ))}
              {errors.general && (
                <div className="text-red-600 text-sm mb-4">
                  {errors.general}
                </div>
              )}
              <Button type="submit" loading={loading}>
                Sign In
              </Button>
              <div className="text-center text-sm mt-2">
                <Link
                  to="/forgot-password"
                  className="text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </Link>
              </div>
              <div className="text-center text-sm mt-2">
                <span className="text-gray-600">Don't have an account? </span>
                <Link
                  to="/register"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
