import { useState } from "react";

export default function User() {

  const [name,setName] = useState("");
  const [dob,setDob] = useState("");
  const [income,setIncome] = useState("");
  const [pan,setPan] = useState("");

  const [creditLimit,setCreditLimit] = useState(null);
  const [creditScore,setCreditScore] = useState(null);

  const [showApply,setShowApply] = useState(false);

  const token = localStorage.getItem("token");

  // Check Credit Score
  const checkCredit = async (e) => {

    e.preventDefault();

    const response = await fetch(
      "https://localhost:7062/api/Authorization/check-credit",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({
          name:name,
          pan:pan,
          dob:dob,
          income:income
        })
      }
    );

    if(!response.ok){
      alert("Unable to check credit");
      return;
    }

    const data = await response.json();

    setCreditScore(data.creditScore);
    setCreditLimit(data.creditLimit);

    setShowApply(true);
  };


  // Apply for credit card
  const applyApplication = async (e) => {

    e.preventDefault();

    const response = await fetch(
      "https://localhost:7062/api/Authorization/apply",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({
          name:name,
          pan:pan,
          dob:dob,
          income:income,
          creditScore:creditScore,
          creditLimit:creditLimit
        })
      }
    );

    if(!response.ok){
      alert("Application not submitted");
      return;
    }

    alert("Application Submitted Successfully");
  };



  return (

<div
className="d-flex justify-content-center align-items-center vh-100"
style={{
background: "linear-gradient(135deg, #1e3c72, #2a5298)"
}}
>

<div className="card shadow-lg p-4" style={{ width: "380px" }}>

<h3 className="text-center text-primary mb-4">
Apply For Credit Card
</h3>

<form>

<div className="mb-3">
<label className="form-label">Name</label>

<input
type="text"
className="form-control"
value={name}
onChange={(e)=>setName(e.target.value)}
required
/>
</div>


<div className="mb-3">
<label className="form-label">Date of Birth</label>

<input
type="date"
className="form-control"
value={dob}
onChange={(e)=>setDob(e.target.value)}
required
/>
</div>


<div className="mb-3">
<label className="form-label">Annual Income</label>

<input
type="number"
className="form-control"
value={income}
onChange={(e)=>setIncome(e.target.value)}
required
/>
</div>


<div className="mb-3">
<label className="form-label">PAN Number</label>

<input
type="text"
className="form-control"
value={pan}
onChange={(e)=>setPan(e.target.value)}
required
/>
</div>


<button
type="button"
className="btn btn-primary w-100"
onClick={checkCredit}
>
Check Credit Limit
</button>


{creditScore && (

<div className="mt-3 text-center">

<h5>Credit Score : {creditScore}</h5>

<h5>Credit Limit : ₹{creditLimit}</h5>

</div>

)}


{showApply && (

<button
className="btn btn-success w-100 mt-3"
onClick={applyApplication}
>
Apply
</button>

)}

</form>

</div>

</div>

  );
}