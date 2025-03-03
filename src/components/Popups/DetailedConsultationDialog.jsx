import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X, FileSpreadsheet, Plus, Pencil, Check, X as Cross, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { gql, useMutation } from "@apollo/client";
import { toast } from "react-toastify";

const UPDATE_APPOINTMENT = gql`
  mutation UpdateAppointment(
    $appointmentId: String!,
    $bodyTemp: String!,
    $heartRate: String!,
    $respRate: String!,
    $bloodPres: String!,
    $spO2: String!,
    $remarks: String!,
    $selectDate: String,
    $doctorNotes: String!,
  ){
    updateAppointment(
      appointmentId: $appointmentId,
      bodyTemp: $bodyTemp,
      heartRate: $heartRate,
      respRate: $respRate,
      bloodPres: $bloodPres,
      spO2: $spO2,
      remarks: $remarks,
      selectDate: $selectDate,
      doctorNotes: $doctorNotes
    ){
      status
      data
      message
    }
  }
`;

export default function DetailedConsultationDialog({ open, onOpenChange, appointment, onUpdateSuccess }) {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const lastUpdatedVitals = useSelector((state) => state.patientDetails?.data?.data?.lastUpdatedVitals);
  
  
  // Properly implement the mutation with callbacks
  const [updateAppointment, { loading, error }] = useMutation(UPDATE_APPOINTMENT, {
    onCompleted: (data) => {
      if (data?.updateAppointment?.status === true) {
     toast.success(data.updateAppointment.message || "Appointment updated successfully");
        // Close the dialog
        onOpenChange(false);
      } else {
        toast({
          title: "Error",
          description: data?.updateAppointment?.message || "Failed to update appointment",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      toast({
        title: "Error",
        description: error.message || "An error occurred while updating the appointment",
        variant: "destructive",
      });
    }
  });
  
  // Extract appointment ID from Redux or from props
  const appointmentId = appointment?.appointmentId || "";

  // Add useEffect for real-time date updates
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
  
    return () => clearInterval(timer);
  }, []);
  
  const formattedDateTime = currentDateTime
    .toLocaleDateString('en-GB') // Formats as DD/MM/YYYY
    .replace(/\//g, '-'); // Replaces slashes with dashes
  
  

  // Initialize data from appointment prop when component mounts or when appointment changes
  useEffect(() => {
    if (appointment) {
      // Prefill form data
      setFormData({
        appointmentId,
        chiefComplaint: appointment?.chiefComplaint || "",
        bodyTemp: lastUpdatedVitals?.bodyTemp || "",
        heartRate: lastUpdatedVitals?.heartRate || "",
        respRate: lastUpdatedVitals?.respRate || "",
        bloodPres: lastUpdatedVitals?.bloodPres || "",
        spO2: lastUpdatedVitals?.spO2 || "",
        weight: lastUpdatedVitals?.weight || "",
        remarks: appointment?.remarks || "",
        doctorNotes: appointment?.doctorsNotes || "",
        selectDate: formattedDateTime,
        medications: appointment?.medications || [],
        diagnosticTests: appointment?.diagnosticTests || [],
        diagnosticInput: "",
      });
    }
  }, [appointment, lastUpdatedVitals, formattedDateTime]);

  // Add editMode state to track whether we're editing vitals
  const [editingVitals, setEditingVitals] = useState(false);

  // Add editMode state for weight specifically
  const [editingWeight, setEditingWeight] = useState(false);
  const [tempWeight, setTempWeight] = useState(lastUpdatedVitals?.weight || "");

  const user = useSelector((state) => state.auth.user);
  
  const [formData, setFormData] = useState({
    chiefComplaint: appointment?.chiefComplaint || "",
    bodyTemp: lastUpdatedVitals?.bodyTemp || "",
    heartRate: lastUpdatedVitals?.heartRate || "",
    respRate: lastUpdatedVitals?.respRate || "",
    bloodPres: lastUpdatedVitals?.bloodPres || "",
    spO2: lastUpdatedVitals?.spO2 || "",
    weight: lastUpdatedVitals?.weight || "",
    remarks: appointment?.remarks || "",
    doctorNotes: appointment?.doctorsNotes || "",
    selectDate: formattedDateTime,
    medications: appointment?.medications || [],
    diagnosticTests: appointment?.diagnosticTests || [],
    diagnosticInput: "",
  });

  // Start editing vitals
  const startEditingVitals = () => {
    setEditingVitals(true);
  };

  // Cancel vitals editing
  const cancelVitalsEditing = () => {
    // Reset to last known values
    setFormData(prev => ({
      ...prev,
      bodyTemp: lastUpdatedVitals?.bodyTemp || "",
      heartRate: lastUpdatedVitals?.heartRate || "",
      respRate: lastUpdatedVitals?.respRate || "",
      bloodPres: lastUpdatedVitals?.bloodPres || "",
      spO2: lastUpdatedVitals?.spO2 || "",
    }));
    setEditingVitals(false);
  };

  const handleMedicationChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      medications: prev.medications.map((med, i) =>
        i === index ? { ...med, [field]: value } : med
      ),
    }));
  };

  const addNewMedication = () => {
    setFormData((prev) => ({
      ...prev,
      medications: [
        ...prev.medications,
        {
          name: "",
          dose: "",
          morning: "",
          afternoon: "",
          evening: "",
          night: "",
          duration: "",
          quantity: "",
          instructions: "",
        },
      ],
    }));
  };

  const addDiagnosticTest = () => {
    if (
      formData.diagnosticInput &&
      !formData.diagnosticTests.includes(formData.diagnosticInput)
    ) {
      setFormData((prev) => ({
        ...prev,
        diagnosticTests: [...prev.diagnosticTests, prev.diagnosticInput],
        diagnosticInput: "",
      }));
    }
  };

  const removeDiagnosticTest = (testToRemove) => {
    setFormData((prev) => ({
      ...prev,
      diagnosticTests: prev.diagnosticTests.filter(
        (test) => test !== testToRemove
      ),
    }));
  };

  // Add handlers for weight editing
  const startEditingWeight = () => {
    setTempWeight(lastUpdatedVitals?.weight || "");
    setEditingWeight(true);
  };

  const saveWeightChanges = () => {
    setFormData(prev => ({
      ...prev,
      weight: tempWeight
    }));
    setEditingWeight(false);
  };

  const cancelWeightEditing = () => {
    setTempWeight(lastUpdatedVitals?.weight || "");
    setEditingWeight(false);
  };

  // Save all changes
  const handleSave = async () => {
    try {
      // Show loading indicator in button
      await updateAppointment({
        variables: {
          appointmentId: appointmentId,
          bodyTemp: formData.bodyTemp,
          heartRate: formData.heartRate,
          respRate: formData.respRate,
          bloodPres: formData.bloodPres,
          spO2: formData.spO2,
          remarks: formData.remarks,
          selectDate: formattedDateTime,
          doctorNotes: formData.doctorNotes,
        }
      });
      setEditingVitals(false);
      
      // The onCompleted callback will handle success case
    } catch (err) {
      // The onError callback will handle error case
      console.error("Error in handleSave:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[95dvw] w-[90%] h-[100vh] rounded-3xl bg-white p-4">
        <DialogHeader className="flex flex-row items-center justify-between border-b ">
          <div className="flex items-center justify-between w-full mb-2 ">
            <h2 className="text-xl">
              Dr. {user?.fullname} - {formattedDateTime}
            </h2>
          </div>
        </DialogHeader>

        <div className="flex justify-between gap-6 mb-2 w-full">
          {/* Left Section */}
          <div className="space-y-2 w-[70%]">
            {/* Chief Complaint */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">
                Chief Complaint
              </label>
              <Input
                value={formData.chiefComplaint}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    chiefComplaint: e.target.value,
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
                value={formData.remarks}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, remarks: e.target.value }))
                }
                placeholder="Patient reported fall in the bathroom few hours ago. Complained of extreme pain in left ankle, visible swelling and restricted movement, no wound or bleeding. Prescribed meds and suggested an X-ray"
                className="min-h-[100px] border-gray-200 w-full"
              />
            </div>

            {/* Medications Table */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-600">
                  Medication
                </label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={addNewMedication}
                  className="text-blue-500 hover:text-blue-600"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Medication
                </Button>
              </div>
              <div className="border rounded-lg overflow-x-auto max-w-full">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-2 text-left">Medication</th>
                      <th className="px-4 py-2 text-left">Dose</th>
                      <th className="px-4 py-2 text-left">Morning</th>
                      <th className="px-4 py-2 text-left">Afternoon</th>
                      <th className="px-4 py-2 text-left">Evening</th>
                      <th className="px-4 py-2 text-left">Night</th>
                      <th className="px-4 py-2 text-left">Duration</th>
                      <th className="px-4 py-2 text-left">Quantity</th>
                      <th className="px-4 py-2 text-left">Inst</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData?.medications?.map((med, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-4 py-2">
                          <Input
                            value={med.name}
                            onChange={(e) =>
                              handleMedicationChange(
                                index,
                                "name",
                                e.target.value
                              )
                            }
                            placeholder="Medicine"
                            className="border-0 bg-transparent p-0 h-8"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <Input
                            value={med.dose}
                            onChange={(e) =>
                              handleMedicationChange(
                                index,
                                "dose",
                                e.target.value
                              )
                            }
                            placeholder="Dose"
                            className="border-0 bg-transparent p-0 h-8"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <Input
                            value={med.morning}
                            onChange={(e) =>
                              handleMedicationChange(
                                index,
                                "morning",
                                e.target.value
                              )
                            }
                            placeholder="Morning"
                            className="border-0 bg-transparent p-0 h-8"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <Input
                            value={med.afternoon}
                            onChange={(e) =>
                              handleMedicationChange(
                                index,
                                "afternoon",
                                e.target.value
                              )
                            }
                            placeholder="Afternoon"
                            className="border-0 bg-transparent p-0 h-8"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <Input
                            value={med.evening}
                            onChange={(e) =>
                              handleMedicationChange(
                                index,
                                "evening",
                                e.target.value
                              )
                            }
                            placeholder="Evening"
                            className="border-0 bg-transparent p-0 h-8"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <Input
                            value={med.night}
                            onChange={(e) =>
                              handleMedicationChange(
                                index,
                                "night",
                                e.target.value
                              )
                            }
                            placeholder="Night"
                            className="border-0 bg-transparent p-0 h-8"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <Input
                            value={med.duration}
                            onChange={(e) =>
                              handleMedicationChange(
                                index,
                                "duration",
                                e.target.value
                              )
                            }
                            placeholder="Duration"
                            className="border-0 bg-transparent p-0 h-8"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <Input
                            value={med.quantity}
                            onChange={(e) =>
                              handleMedicationChange(
                                index,
                                "quantity",
                                e.target.value
                              )
                            }
                            placeholder="Quantity"
                            className="border-0 bg-transparent p-0 h-8"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <Input
                            value={med.instructions}
                            onChange={(e) =>
                              handleMedicationChange(
                                index,
                                "instructions",
                                e.target.value
                              )
                            }
                            placeholder="Instructions"
                            className="border-0 bg-transparent p-0 h-8"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Diagnostic Tests */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">
                Diagnostic Tests
              </label>
              <div className="flex items-center gap-2">
                <Input
                  value={formData.diagnosticInput || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      diagnosticInput: e.target.value,
                    }))
                  }
                  placeholder="Enter diagnostic test"
                  className="border-gray-200 flex-grow"
                />
                <Button
                  type="button"
                  onClick={addDiagnosticTest}
                  className="p-2"
                  variant="outline"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <label  className="text-sm font-medium text-gray-600">
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
                      <Cross className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              <div className="grid gap-1">
                <div className="flex justify-between items-center p-2 rounded-lg">
                  <span className="text-green-600">Body Temp :</span>
                  {!editingVitals ? (
                    <span className="text-blue-500 font-medium">{lastUpdatedVitals?.bodyTemp}F</span>
                  ) : (
                    <Input
                      value={formData.bodyTemp}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, bodyTemp: e.target.value }))
                      }
                      className="text-blue-500 bg-transparent p-2 h-8 w-24 text-right"
                    />
                  )}
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg">
                  <span className="text-green-600">Heart Rate :</span>
                  {!editingVitals ? (
                    <span className="text-blue-500 font-medium">{lastUpdatedVitals?.heartRate} BPM</span>
                  ) : (
                    <Input
                      value={formData.heartRate}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, heartRate: e.target.value }))
                      }
                      className="text-blue-500 bg-transparent p-2 h-8 w-24 text-right"
                    />
                  )}
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg">
                  <span className="text-green-600">Resp Rate :</span>
                  {!editingVitals ? (
                    <span className="text-blue-500 font-medium">{lastUpdatedVitals?.respRate} bpm</span>
                  ) : (
                    <Input
                      value={formData.respRate}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, respRate: e.target.value }))
                      }
                      className="text-blue-500 bg-transparent p-2 h-8 w-24 text-right"
                    />
                  )}
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg">
                  <span className="text-green-600">Blood Pres :</span>
                  {!editingVitals ? (
                    <span className="text-blue-500 font-medium">{lastUpdatedVitals?.bloodPres} mmhg</span>
                  ) : (
                    <Input
                      value={formData.bloodPres}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, bloodPres: e.target.value }))
                      }
                      className="text-blue-500 bg-transparent p-2 h-8 w-24 text-right"
                    />
                  )}
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg">
                  <span className="text-green-600">SpO2 :</span>
                  {!editingVitals ? (
                    <span className="text-blue-500 font-medium">{lastUpdatedVitals?.spO2}%</span>
                  ) : (
                    <Input
                      value={formData.spO2}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, spO2: e.target.value }))
                      }
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
                    <span className="text-blue-500 font-medium">{lastUpdatedVitals?.weight} kg</span>
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
                        <Cross className="h-4 w-4" />
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
                {formData?.diagnosticTests?.map((test, index) => (
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
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin w-4 h-4" title="Saving"/> : ""}
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}