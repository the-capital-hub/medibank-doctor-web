import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, X, Check, FileSpreadsheet, PlusSquare } from "lucide-react";
import { useSelector } from "react-redux";
import { gql, useMutation } from "@apollo/client";

const CREATE_DIAGNOSIS = gql`
  mutation CreateAppointmentByDoctor(
    $mbid: String!,
    $selectDate: String!,
    $chiefComplaint: String!,
    $remarks: String!,
    $bodyTemp: String!,
    $heartRate: String!,
    $respRate: String!,
    $bloodPres: String!,
    $spO2: String!,
    $doctorNotes: String!
  ) {
    createAppointmentByDoctor(
      mbid: $mbid,
      selectDate: $selectDate,
      chiefComplaint: $chiefComplaint,
      remarks: $remarks,
      bodyTemp: $bodyTemp,
      heartRate: $heartRate,
      respRate: $respRate,
      bloodPres: $bloodPres,
      spO2: $spO2,
      doctorNotes: $doctorNotes
    ) {
      status
      data
      message
    }
  }
`;

export default function NewDiagnosisPopup({ open, onOpenChange }) {
    // Get MBID from Redux store
    const userDetails = useSelector(state => state.patientDetails?.data?.data?.userDetails || {});
    console.log(userDetails)
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
          setCurrentDateTime(new Date());
        }, 1000);
      
        return () => clearInterval(timer);
      }, []);
      
      const formattedDateTime = currentDateTime
        .toLocaleDateString('en-GB') // Formats as DD/MM/YYYY
        .replace(/\//g, '-'); // Replaces slashes with dashes
    
    const [formData, setFormData] = useState({
        mbid: String(userDetails?.MBID),
        chiefComplaint: "",
        clinicalNotes: "",
        doctorNotes: "",
        medicationAndDosage: "",
        medication: "",
        dosage: "",
        diagnosticTest: "",
        diagnosticTests: [], // Added this array for the list of tests
        selectDate:formattedDateTime  // Initialize with current date
    });
  // Add useEffect for real-time date updates
 
  
    // Sample medications list
    const medications = [
        { id: 1, name: "Amoxicillin" },
        { id: 2, name: "Ibuprofen" },
        { id: 3, name: "Paracetamol" },
        { id: 4, name: "Aspirin" },
        { id: 5, name: "Loratadine" },
        { id: 6, name: "Omeprazole" }
    ];
    
    const [vitals, setVitals] = useState({
        bodyTemp: "99.4 ",
        heartRate: "72 ",
        respRate: "14 ",
        bloodPres: "100/70",
        spo2: "98",
        weight: "72",
    });

    const [editingVitals, setEditingVitals] = useState(false);
    
    // Temporary vitals state for editing
    const [tempVitals, setTempVitals] = useState({...vitals});

    // Add editMode state for weight specifically
    const [editingWeight, setEditingWeight] = useState(false);
    const [tempWeight, setTempWeight] = useState(vitals.weight);

    // Initialize the createDiagnosis mutation
    const [createDiagnosis, { loading, error }] = useMutation(CREATE_DIAGNOSIS,
        {
            onCompleted: (data) => {
                if (data && data?.createDiagnosis?.status === true) {
                    toast.success(data.createDiagnosis.message || "Diagnosis created successfully");
                }
        }}
    );

    // Sample diagnostic tests list
    const diagnosticTests = [
        { id: 1, name: "Complete Blood Count (CBC)" },
        { id: 2, name: "X-Ray" },
        { id: 3, name: "MRI Scan" },
        { id: 4, name: "CT Scan" },
        { id: 5, name: "Ultrasound" },
        { id: 6, name: "ECG/EKG" },
        { id: 7, name: "Blood Glucose Test" },
        { id: 8, name: "Urinalysis" }
    ];

    // Add handlers for weight editing - moved inside the component
    const startEditingWeight = () => {
        setTempWeight(vitals.weight);
        setEditingWeight(true);
    };

    const saveWeightChanges = () => {
        setVitals(prev => ({
            ...prev,
            weight: tempWeight
        }));
        setEditingWeight(false);
    };

    const cancelWeightEditing = () => {
        setEditingWeight(false);
    };
    
    const handleVitalsChange = (field, value) => {
        setTempVitals(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Start editing vitals
    const startEditingVitals = () => {
        setTempVitals({...vitals});
        setEditingVitals(true);
    };

    // Save vitals changes
    const saveVitalsChanges = () => {
        setVitals({...tempVitals});
        setEditingVitals(false);
    };

    // Cancel vitals editing
    const cancelVitalsEditing = () => {
        setEditingVitals(false);
    };
    
    const handleMedicationChange = (value) => {
        setFormData((prev) => ({
            ...prev,
            medication: value
        }));
    };

    const handleDiagnosticTestChange = (value) => {
        setFormData((prev) => ({
            ...prev,
            diagnosticTest: value
        }));
    };

    // Function to add diagnostic test to the list
    const addDiagnosticTest = () => {
        if (formData.diagnosticTest && !formData.diagnosticTests.includes(formData.diagnosticTest)) {
            setFormData(prev => ({
                ...prev,
                diagnosticTests: [...prev.diagnosticTests, formData.diagnosticTest],
                diagnosticTest: "" // Clear the selection field after adding
            }));
        }
    };

    // Add missing removeDiagnosticTest function
    const removeDiagnosticTest = (testToRemove) => {
        setFormData(prev => ({
            ...prev,
            diagnosticTests: prev.diagnosticTests.filter(test => test !== testToRemove)
        }));
    };

    // Handle form submission and trigger the mutation
    const handleSubmit = async () => {
        try {
            // Get MBID from Redux store
            const MBID = userDetails.MBID || "";
            
            if (!MBID) {
                console.error("MBID not found in user details");
                return;
            }
            
            // Prepare the diagnostic tests as a string for the remarks
            const testsString = formData.diagnosticTests.join(', ');
            const medicationInfo = formData.medication ? `Medication: ${formData.medication}` : '';
            
            // Compile remarks from clinical notes and tests
            const remarks = `${formData.clinicalNotes || ''}\n${medicationInfo}\nDiagnostic Tests: ${testsString}`;
            
            const result = await createDiagnosis({
                variables: {
                    mbid: MBID,
                    selectDate: formData.selectDate,
                    chiefComplaint: formData.complaint || "",
                    remarks: remarks,
                    bodyTemp: vitals.bodyTemp,
                    heartRate: vitals.heartRate,
                    respRate: vitals.respRate,
                    bloodPres: vitals.bloodPres,
                    spO2: vitals.spo2,
                    doctorNotes: formData.doctorNotes
                }
            });
            
            console.log("Diagnosis created:", result);
            onOpenChange(false); // Close the dialog on success
        } catch (err) {
            console.error("Error creating diagnosis:", err);
            // Handle error - could show an error message to the user
        }
    };

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[95dvw] rounded-3xl w-[90%] bg-white">
                    <DialogHeader className="flex flex-row items-center justify-between border-b ">
                        <h2 className="text-xl font-semibold mb-2">New Diagnosis</h2>
                    </DialogHeader>

                    <div className="flex justify-between gap-6 mb-2 w-full">
                        {/* Left Section */}
                        <div className="space-y-2 w-[70%]">
                            {/* Patient Info from Redux */}
                            {/* <div className="p-3 bg-blue-50 rounded-lg mb-4">
                                <p className="text-sm font-medium text-gray-600">
                                    Patient: <span className="text-blue-600">{userDetails.name || "N/A"}</span>
                                </p>
                                <p className="text-sm font-medium text-gray-600">
                                    MBID: <span className="text-blue-600">{userDetails.MBID || "N/A"}</span>
                                </p>
                            </div> */}
                            
                            {/* Chief Complaint */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">
                                    Chief Complaint
                                </label>
                                <Input
                                    value={formData.complaint}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            complaint: e.target.value,
                                        }))
                                    }
                                    placeholder="Complaint"
                                    className="border-gray-200 w-full"
                                />
                            </div>
                            {/* Clinical Notes */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">
                                    Clinical Notes
                                </label>
                                <Textarea
                                    value={formData.clinicalNotes}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, clinicalNotes: e.target.value }))
                                    }
                                    placeholder="Patient reported fall in the bathroom few hours ago. Complained of extreme pain in left ankle, visible swelling and restricted movement, no wound or bleeding. Prescribed meds and suggested an X-ray"
                                    className="min-h-[100px] border-gray-200 w-full"
                                />
                            </div>

                            {/* Medications */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">
                                    Medication & Dosage
                                </label>


                                <Select
                                    value={formData.medication}
                                    onValueChange={handleMedicationChange}
                                >
                                    <SelectTrigger className="border-gray-200 ">
                                        <SelectValue placeholder="Medication & Dosage" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-100 cursor-pointer">
                                        {medications.map(med => (
                                            <SelectItem key={med.id} value={med.name} className="bg-gray-100 cursor-pointer">
                                                {med.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Diagnostic Tests */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">
                                    Diagnostic Test
                                </label>
                                <div className="flex gap-2">
                                    <Select
                                        value={formData.diagnosticTest}
                                        onValueChange={handleDiagnosticTestChange}
                                    >
                                        <SelectTrigger className="border-gray-200 flex-1">
                                            <SelectValue placeholder="Diagnostic test" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-100 cursor-pointer">
                                            {diagnosticTests.map(test => (
                                                <SelectItem key={test.id} value={test.name} className="cursor-pointer bg-gray-100">
                                                    {test.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Button 
                                        type="button" 
                                        onClick={addDiagnosticTest}
                                        disabled={!formData.diagnosticTest}
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white"
                                    >
                                        <PlusSquare className="h-4 w-4 mr-1" /> Add
                                    </Button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">
                                    Doctor Notes
                                </label>
                                <Textarea
                                    value={formData.doctorNotes}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, doctorNotes: e.target.value }))
                                    }
                                    placeholder="Prescribed a bronchodilator inhaler (Albuterol) for symptom relief.
Advised rest, hydration, and warm fluids.
Recommended over-the-counter antipyretic (Paracetamol) as needed for fever."
                                    className="min-h-[100px] border-gray-200 w-full"
                                />
                            </div>
                        </div>
                        {/* Right Section */}
                        <div className="w-[30%] space-y-4">
                            <div className="space-y-2 border rounded-xl p-4 bg-gray-50">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-medium">Vitals</h3>
                                    {!editingVitals ? (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={startEditingVitals}
                                            className="text-blue-500 hover:text-blue-600 p-1 h-8"
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    ) : (
                                        <div className="flex gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={cancelVitalsEditing}
                                                className="text-red-500 hover:text-red-600 p-1 h-8"
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={saveVitalsChanges}
                                                className="text-green-500 hover:text-green-600 p-1 h-8"
                                            >
                                                <Check className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                                <div className="grid gap-1">
                                    <div className="flex justify-between items-center p-2 rounded-lg">
                                        <span className="text-green-600">Body Temp :</span>
                                        {!editingVitals ? (
                                            <span className="text-blue-500 font-medium">{vitals.bodyTemp}F</span>
                                        ) : (
                                            <Input
                                                value={tempVitals.bodyTemp}
                                                onChange={(e) => handleVitalsChange("bodyTemp", e.target.value)}
                                                className="text-blue-500 bg-transparent p-2 h-8 w-24 text-right"
                                            />
                                        )}
                                    </div>
                                    <div className="flex justify-between items-center p-2 rounded-lg">
                                        <span className="text-green-600">Heart Rate :</span>
                                        {!editingVitals ? (
                                            <span className="text-blue-500 font-medium">{vitals.heartRate} BPM</span>
                                        ) : (
                                            <Input
                                                value={tempVitals.heartRate}
                                                onChange={(e) => handleVitalsChange("heartRate", e.target.value)}
                                                className="text-blue-500 bg-transparent p-2 h-8 w-24 text-right"
                                            />
                                        )}
                                    </div>
                                    <div className="flex justify-between items-center p-2 rounded-lg">
                                        <span className="text-green-600">Resp Rate :</span>
                                        {!editingVitals ? (
                                            <span className="text-blue-500 font-medium">{vitals.respRate} bpm</span>
                                        ) : (
                                            <Input
                                                value={tempVitals.respRate}
                                                onChange={(e) => handleVitalsChange("respRate", e.target.value)}
                                                className="text-blue-500 bg-transparent p-2 h-8 w-24 text-right"
                                            />
                                        )}
                                    </div>
                                    <div className="flex justify-between items-center p-2 rounded-lg">
                                        <span className="text-green-600">Blood Pres :</span>
                                        {!editingVitals ? (
                                            <span className="text-blue-500 font-medium">{vitals.bloodPres}</span>
                                        ) : (
                                            <Input
                                                value={tempVitals.bloodPres}
                                                onChange={(e) => handleVitalsChange("bloodPres", e.target.value)}
                                                className="text-blue-500 bg-transparent p-2 h-8 w-24 text-right"
                                            />
                                        )}
                                    </div>
                                    <div className="flex justify-between items-center p-2 rounded-lg">
                                        <span className="text-green-600">SpO2 :</span>
                                        {!editingVitals ? (
                                            <span className="text-blue-500 font-medium">{vitals.spo2}%</span>
                                        ) : (
                                            <Input
                                                value={tempVitals.spo2}
                                                onChange={(e) => handleVitalsChange("spo2", e.target.value)}
                                                className="text-blue-500 bg-transparent p-2 h-8 w-24 text-right"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center border rounded-xl p-4 bg-gray-50">
                                <div className="flex items-center justify-between w-full">
                                    <span className="text-green-600">Weight :</span>
                                    <div className="flex items-center gap-2">
                                        {!editingWeight ? (
                                            <span className="text-blue-500 font-medium">{vitals.weight} kg</span>
                                        ) : (
                                            <Input
                                                className="bg-transparent p-2 h-8 w-24 text-right"
                                                value={tempWeight}
                                                onChange={(e) => setTempWeight(e.target.value)}
                                            />
                                        )}
                                        {!editingWeight ? (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={startEditingWeight}
                                                className="text-blue-500 hover:text-blue-600 p-1 h-8 ml-2"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        ) : (
                                            <div className="flex gap-2 ml-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={cancelWeightEditing}
                                                    className="text-red-500 hover:text-red-600 p-1 h-8"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={saveWeightChanges}
                                                    className="text-green-500 hover:text-green-600 p-1 h-8"
                                                >
                                                    <Check className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">
                                    Diagnostic Tests
                                </label>
                                <div className="flex gap-2 flex-wrap">
                                    {formData.diagnosticTests.map((test, index) => (
                                        <div
                                            key={index}
                                            className="w-max flex items-center gap-3 bg-red-100 p-2 rounded-lg text-gray-600"
                                        >
                                            <div className="flex items-center gap-2">
                                                <FileSpreadsheet className="w-5 h-5" />
                                                <span>{test}</span>
                                            </div>
                                            <Button
                                                type="button"
                                                onClick={() => removeDiagnosticTest(test)}
                                                className="p-1 h-auto"
                                                variant="ghost"
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-4 w-full mt-4">
                                <Button
                                    variant="outline"
                                    className="flex-1 text-base font-normal border border-red-500 text-red-500"
                                    onClick={() => onOpenChange(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="flex-1 text-base text-white font-normal bg-indigo-600 hover:bg-indigo-700"
                                    onClick={handleSubmit}
                                    disabled={loading || !userDetails.MBID}
                                >
                                    {loading ? "Saving..." : "Save"}
                                </Button>
                            </div>
                            
                            {error && (
                                <div className="text-red-500 text-sm mt-2">
                                    Error: {error.message}
                                </div>
                            )}
                            
                            {!userDetails.MBID && (
                                <div className="text-red-500 text-sm mt-2">
                                    Error: Patient MBID not found
                                </div>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}