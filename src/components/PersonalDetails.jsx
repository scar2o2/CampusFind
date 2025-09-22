import { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import { addUser,getUser,checkUser } from "../../supabaseCRUD";
const PersonalDetails = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  useEffect(()=>{
    if(!user) navigate('/login');
    const checkUserExists= async()=>{
      const exist =await checkUser("email",user.email);
      if(exist){
        await getUser('email',user.email).then((res)=>{
          setUser({ ...user, name: res[0].name, phone: res[0].phn_no });
          navigate('/');
        })

      }
    }
    checkUserExists();
  },[])
  const [errMsg, setErrMsg] = useState('');
  const [msg, setMsg] = useState('');
  const [profileData, setProfileData] = useState({
    fullName: user?.name || '',
    phoneNumber: user?.phone || ''
  });

  const AddUserDB = async () => {
    setMsg('Profile updated successfully!');
    setTimeout(() => setMsg(''), 3000);
    await addUser(user);
  }

  const handleInputChange = (field, value) => {
    if (field === 'phoneNumber') {
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setProfileData(prev => ({ ...prev, [field]: numericValue }));
    } else {
      setProfileData(prev => ({ ...prev, [field]: value }));
    }
  };

  const validatePhoneNumber = (phone) => /^\d{10}$/.test(phone);

  const handleSubmit = () => {
    if (!profileData.fullName.trim()) {
      setErrMsg('Please enter your full name.');
      return;
    }
    if (!profileData.phoneNumber.trim() || !validatePhoneNumber(profileData.phoneNumber)) {
      setErrMsg('Please enter a valid 10-digit phone number.');
      return;
    }

    setUser({ ...user, name: profileData.fullName, phone: profileData.phoneNumber });
    setErrMsg('');
    AddUserDB();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Edit Profile Details</h1>
          <p className="text-gray-600">Update your personal information and preferences.</p>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={profileData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-200"
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={profileData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              placeholder="Enter 10-digit phone number"
              maxLength="10"
              className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent focus:bg-white transition-all duration-200 ${
                profileData.phoneNumber && !validatePhoneNumber(profileData.phoneNumber)
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-200 focus:ring-blue-500'
              }`}
            />
            {profileData.phoneNumber && !validatePhoneNumber(profileData.phoneNumber) && (
              <p className="mt-1 text-sm text-red-600">Phone number must be exactly 10 digits</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => { handleSubmit(); navigate('/'); }}
              disabled={!profileData.fullName.trim() || !validatePhoneNumber(profileData.phoneNumber)}
              className={`flex-1 py-3 px-6 rounded-lg font-medium cursor-pointer transition-all duration-200 ${
                !profileData.fullName.trim() || !validatePhoneNumber(profileData.phoneNumber)
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-black/80'
              }`}
            >
              Save Profile
            </button>
            <span className={errMsg===''?'text-xl text-green-500':"text-xl text-red-500"}>{errMsg && errMsg}{msg && msg}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
