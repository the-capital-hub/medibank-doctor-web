import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Eye, EyeOff, Upload, UserRound, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import OTPVerificationPopup from "./OtpVerificationPopup";
import { toast } from "react-toastify";
import { useMutation, gql } from "@apollo/client";

const Register = gql`
  mutation Register(
    $fullname: String!,
    $EmailID: String!,
    $mobile_num: String!,
    $city: String!,
    $state: String!,
    $date_of_birth: String!,
    $sex: String!,
    $Password: String!,
    $userType: String!,
    $qualifications: String,
    $collegeName: String,
    $courseYear: String,
    $licenseRegistrationNo: String
  ) {
    register(
      fullname: $fullname
      EmailID: $EmailID
      mobile_num: $mobile_num
      city: $city
      state: $state
      date_of_birth: $date_of_birth
      sex: $sex
      Password: $Password
      userType: $userType
      qualifications: $qualifications
      collegeName: $collegeName
      courseYear: $courseYear
      licenseRegistrationNo: $licenseRegistrationNo
    ) {
      status
      data
      message
    }
  }
`;

const uploadImage= gql`
mutation UploadProfileAfterVerification ($base64Data: String) {
    uploadProfileAfterVerification(base64Data: $base64Data) {
        status
        data
        message
    }
}`

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [showOTPDialog, setShowOTPDialog] = useState(false);

  
  // Initialize form data with all required fields
  const [formData, setFormData] = useState({
	base64Data: "",
    fullname: "",
    EmailID: "",
    mobile_num: "",
    city: "",
    state: "",
    date_of_birth: "",
    sex: "male", // Default value
    Password: "",
    confirmPassword: "",
    userType: "doctor", // Default value
    qualifications: "",
    collegeName: "",
    courseYear: "",
    licenseRegistrationNo: "",
    emergency_contact_number: "",
  });

  // Initialize local state for qualifications UI management
  const [qualifications, setQualifications] = useState([
    {
      id: 1,
      qualification: "",
      college: "",
      year: "",
      city: "",
      state: "",
    },
  ]);

  // Separate mutation hooks
  const [register, { loading: registerLoading }] = useMutation(Register, {
    onCompleted: (data) => {
      if (data && data.register) {
        toast("Please verify your account");
        setShowOTPDialog(true);
      } else {
        toast("Registration failed. Please try again.");
      }
    },
    onError: (error) => {
      console.error("GraphQL Error Details:", error);
      toast(`Registration failed: ${error.message}`);
    },
  });

  const [uploadProfileImage, { loading: uploadLoading }] = useMutation(uploadImage);

  // Use combined loading state in UI
  const loading = registerLoading || uploadLoading;

  const location = useLocation();
  const isAdmin = location.pathname.includes("/admin");
  const baseRoute = isAdmin ? "/admin" : "/doctor";

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({
          ...prev,
          base64Data: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle text input changes
  const handleInputChange = (e) => {
	const { id, value } = e.target;
	setFormData((prev) => ({
	  ...prev,
	  [id]: value,
	}));
  };

  // Handle select input changes
//   const handleSelectChange = (id, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [id]: value,
//     }));
//   };

//   // Handle qualification changes
//   const handleQualificationChange = (id, field, value) => {
//     // First update the qualifications UI state
//     const updatedQuals = qualifications.map((q) =>
//       q.id === id ? { ...q, [field]: value } : q
//     );
//     setQualifications(updatedQuals);

//     // Then update formData.qualifications for submission
//     const formattedQuals = updatedQuals.map(({ id, ...rest }) => rest);
//     setFormData((prev) => ({
//       ...prev,
//       qualifications: formattedQuals,
//     }));
//   };

  const addQualification = () => {
    const newQual = {
      id: Date.now(),
      qualification: "",
      college: "",
      year: "",
      city: "",
      state: "",
    };
    setQualifications((prev) => [...prev, newQual]);
  };

  const removeQualification = (id) => {
    if (qualifications.length > 1) {
      const updatedQuals = qualifications.filter((q) => q.id !== id);
      setQualifications(updatedQuals);
      
      // Update formData
      const formattedQuals = updatedQuals.map(({ id, ...rest }) => rest);
      setFormData((prev) => ({
        ...prev,
        qualifications: formattedQuals,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = [
      "fullname", "EmailID", "mobile_num", "city", "state",
      "date_of_birth", "sex", "Password", "userType", "licenseRegistrationNo"
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast(`Please fill in all required fields: ${missingFields.join(", ")}`);
      return;
    }

    // Validate passwords match
    if (formData.Password !== formData.confirmPassword) {
      toast("Passwords do not match!");
      return;
    }

    // Prepare qualifications in the correct format
    // Note: The backend expects an array of QualificationInput objects


    // Prepare mutation variables
    const variables = {
      fullname: formData.fullname,
      EmailID: formData.EmailID,
      mobile_num: formData.mobile_num,
      city: formData.city,
      state: formData.state,
      date_of_birth: formData.date_of_birth,
      sex: formData.sex,
      Password: formData.Password,
      userType: formData.userType,
      qualifications: formData.qualifications,
      collegeName: formData.collegeName || "",
      courseYear: formData.courseYear || "",
      licenseRegistrationNo: formData.licenseRegistrationNo,
    };
	const photoVariables = {
		base64Data: formData.base64Data,
	}

    console.log("Submitting data:", JSON.stringify(variables, null, 2));

    try {
      await register({
        variables: variables
      });
	  await uploadProfileImage({
		variables: photoVariables
	  });
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  // Component for qualification fields
  const QualificationFields = () => (
	<div className="space-y-4 p-4 border rounded-lg relative">
	  {qualifications.length > 1 && (
		<button
		  type="button"
		  onClick={() => removeQualification(qualifications[0].id)}
		  className="absolute top-2 right-2"
		>
		  <X className="h-4 w-4" />
		</button>
	  )}
	  
	  <div className="space-y-2">
		<Label htmlFor="qualifications">
		  Qualification*
		</Label>
		<Input
		  id="qualifications"
		  placeholder="Enter Qualification"
		  value={formData.qualifications}
		  onChange={handleInputChange}
		  required
		/>
	  </div>
  
	  <div className="grid grid-cols-2 gap-4">
		<div className="space-y-2">
		  <Label htmlFor="collegeName">
			Medical College Name*
		  </Label>
		  <Input
			id="collegeName"
			placeholder="Enter College Name"
			value={formData.collegeName}
			onChange={handleInputChange}
			required
		  />
		</div>
		<div className="space-y-2">
		  <Label htmlFor="courseYear">Course Year*</Label>
		  <Input
			type="text"
			id="courseYear"
			placeholder="Enter Year"
			value={formData.courseYear}
			onChange={handleInputChange}
			required
		  />
		</div>
	  </div>
  
	  <div className="grid grid-cols-2 gap-4">
		<div className="space-y-2">
		  <Label htmlFor="qualificationCity">City/Town*</Label>
		  <Input
			id="qualificationCity"
			placeholder="Enter City"
			value={formData.city}
			onChange={handleInputChange}
			
		  />
		</div>
		<div className="space-y-2">
		  <Label htmlFor="qualificationState">State*</Label>
		  <Input
			id="qualificationState"
			placeholder="Enter State"
			value={formData.state}
			onChange={handleInputChange}
			
		  />
		</div>
	  </div>
	</div>
  );
  return (
    <>
      <form onSubmit={handleSubmit} className="p-6 bg-white w-full h-dvh hide-scrollbar overflow-y-scroll">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Create Account</h2>

          <div className="space-y-4">
            {/* Profile Photo */}
            <div className="flex justify-start">
              <div className="relative">
                <div className="w-28 h-28 rounded-lg border-2 border-solid border-gray-300 flex items-center justify-center overflow-hidden">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col justify-center items-center gap-4">
                      <UserRound className="w-8 h-8 text-gray-400" />
                      <div className="text-gray-600">Add Photo</div>
                    </div>
                  )}
                </div>
                <Label
                  htmlFor="base64Data"
                  className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer"
                >
                  <Input
                    id="base64Data"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <span className="sr-only">Add Photo</span>
                  <Upload className="w-4 h-4" />
                </Label>
              </div>
              <div className="space-y-2 w-full ml-5">
                <Label htmlFor="fullname">Full Name*</Label>
                <Input
                  id="fullname"
                  placeholder="Enter Full Name"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Personal Details */}
            <div className="space-y-2">
              <Label htmlFor="date_of_birth">Date of Birth*</Label>
              <Input
                id="date_of_birth"
                type="text"
                value={formData.date_of_birth}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sex">Gender*</Label>
              <Select
                value={formData.sex}
                onValueChange={(value) => handleSelectChange("sex", value)}
                required
              >
                <SelectTrigger id="sex">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="EmailID">Email*</Label>
              <Input
                id="EmailID"
                type="email"
                placeholder="Enter Email"
                value={formData.EmailID}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="licenseRegistrationNo">License Registration ID*</Label>
              <Input
                id="licenseRegistrationNo"
                placeholder="Enter License Registration ID"
                value={formData.licenseRegistrationNo}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mobile_num">Mobile Number*</Label>
                <Input
                  id="mobile_num"
                  placeholder="Enter Mobile Number"
                  value={formData.mobile_num}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergency_contact_number">Emergency Contact Number</Label>
                <Input
                  id="emergency_contact_number"
                  placeholder="Enter Emergency Number"
                  value={formData.emergency_contact_number}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Location */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City/Town*</Label>
                <Input
                  id="city"
                  placeholder="Enter City"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State*</Label>
                <Input
                  id="state"
                  placeholder="Enter State"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Qualifications Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Qualifications</h3>
              {qualifications.map((qual, index) => (
                <QualificationFields
                  key={qual.id}
                  qualification={qual}
                  showRemove={qualifications.length > 1}
                />
              ))}
            </div>

            <div
              className="text-indigo-800 font-semibold cursor-pointer"
              onClick={addQualification}
            >
              + Add More Qualification
            </div>

            {/* Password Section */}
            <div className="space-y-2">
              <Label htmlFor="Password">Password*</Label>
              <div className="relative">
                <Input
                  id="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={formData.Password}
                  onChange={handleInputChange}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password*</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Terms & Submit */}
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" required />
              <label htmlFor="terms" className="text-sm text-gray-600">
                By signing up you agree to our{" "}
                <Link to="/terms" className="text-blue-600 hover:underline">
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-indigo-600 text-white"
              size="lg"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>

            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link
                to={`${baseRoute}/login`}
                className="text-blue-600 hover:underline"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </form>

      <OTPVerificationPopup
        isOpen={showOTPDialog}
        onClose={() => setShowOTPDialog(false)}
        formData={{
          email: formData.EmailID,
          mobileNumber: formData.mobile_num
        }}
      />
    </>
  );
}