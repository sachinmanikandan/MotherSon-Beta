import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { logout } from "../Login/Slice/LoginSlice";
import { useNavigate } from "react-router-dom";

interface CompanyLogo {
	id: number;
	name: string;
	logo: string;
	uploaded_at: string;
}

export default function Nav() {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const userData = useSelector((state: RootState) => state.LoginData.user);
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const [companyLogo, setCompanyLogo] = useState<CompanyLogo | null>(null);
	const [logoLoading, setLogoLoading] = useState(true);
	const goToTermsAndConditions = () => navigate("/TermsAndConditions");
	const goToPrivacyPolicy = () => navigate("/PrivacyPolicy");
	const goToVersionControl = () => navigate("/VersionControl");

	const getInitial = () => {
		if (!userData?.first_name) return "U";
		return userData.first_name.charAt(0).toUpperCase();
	};

	const handleLogout = () => {
		dispatch(logout({ navigate }))
			.unwrap()
			.then((response: any) => {
				navigate("/");
			})
			.catch((error: any) => {
				console.error("Logout failed:", error);
			});
	};

	if (!userData) {
		return null;
	}

	useEffect(() => {
		const fetchCompanyLogo = async () => {
			try {
				const response = await fetch("http://127.0.0.1:8000/logos/");
				const data = await response.json();

				if (data && data.length > 0) {
					setCompanyLogo(data[0]);
				}
			} catch (error) {
				console.error("Error fetching company logo:", error);
			} finally {
				setLogoLoading(false);
			}
		};

		fetchCompanyLogo();
	}, []);

	return (
		<nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur border-b border-gray-200 px-6 py-2.5 flex justify-between items-center text-[#001740] z-50">
			{/* Left: Brand and navigation buttons */}
			<div className="flex items-center gap-4">
				<div className="flex items-center gap-3">
					{logoLoading ? (
						<div className="h-12 w-36 bg-gray-200 rounded animate-pulse" />
					) : companyLogo ? (
						<>
							<img
								src={companyLogo.logo}
								alt={companyLogo.name}
								className="h-14 w-auto max-w-[180px] object-contain"
								style={{ marginRight: "0.5rem" }}
							/>
							<div className="flex flex-col justify-center">
								<span className="text-2xl font-extrabold text-red-600 tracking-wide leading-tight">
									MOTHERSON
								</span>
								<span className="hidden md:inline text-sm font-semibold text-gray-700 tracking-wide mt-1">
									Your Company Slogan
								</span>
							</div>
						</>
					) : (
						<div className="flex flex-col justify-center">
							<span className="text-2xl font-bold tracking-tight text-red-600">MOTHERSON</span>
							<span className="hidden md:inline text-sm font-semibold text-gray-700 tracking-wide mt-1">
								Your Company Slogan
							</span>
						</div>
					)}
				</div>
			</div>

			{/* Center: Dojo 2.0 - Responsive text */}
			<div
				onClick={() => navigate("/")}
				className="absolute left-1/2 transform -translate-x-1/2 text-xl md:text-2xl lg:text-3xl font-bold cursor-pointer transition-transform duration-200 active:scale-105 whitespace-nowrap select-none"
			>
				<span className="hidden sm:inline text-red-600 drop-shadow">
					Dojo 2.0 Training Optimization Platform
				</span>
				<span className="sm:hidden text-red-600">
					Dojo 2.0
				</span>
			</div>

			{/* Right: Navigation and user */}
			<div className="flex items-center gap-3">
				<button
					onClick={() => navigate(-1)}
					className="hidden sm:inline-flex p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
					aria-label="Go back"
					title="Go back"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-7 w-7 text-red-600"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M10 19l-7-7m0 0l7-7m-7 7h18"
						/>
					</svg>
				</button>

				<button
					onClick={() => navigate("/home")}
					className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
					aria-label="Go home"
					title="Home"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-7 w-7 text-red-600"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
						/>
					</svg>
				</button>

				{/* User Avatar and Dropdown */}
				<div className="relative">
					<button
						onClick={() => setDropdownOpen(!dropdownOpen)}
						className="focus:outline-none"
					>
						<div className="w-11 h-11 rounded-full border-2 border-red-600 flex items-center justify-center bg-gradient-to-br from-red-600 to-red-800 text-white font-semibold shadow-md ring-2 ring-red-200 hover:ring-4 transition-all duration-200">
							{getInitial()}
						</div>
					</button>
					{dropdownOpen && (
						<div className="absolute right-0 mt-3 w-80 bg-white/90 backdrop-blur border border-gray-200 rounded-2xl shadow-2xl z-50 text-[#001740] animate-fadeInUp">
							<div className="flex justify-end pt-3 pr-4">
								<button
									onClick={() => setDropdownOpen(false)}
									className="text-gray-400 hover:text-gray-600"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>
							<div className="px-6 text-sm text-center text-gray-500 -mt-2">
								{userData.email}
							</div>
							<div className="flex flex-col items-center px-6 pt-4 pb-3">
								<div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-red-800 text-white flex items-center justify-center font-bold text-2xl shadow-md ring-2 ring-red-200">
									{getInitial()}
									{userData.last_name?.charAt(0).toUpperCase() || ""}
								</div>
								<p className="mt-2 text-xl font-semibold">
									Hi, {userData.first_name}!
								</p>
							</div>
							<div className="px-6 py-2 flex justify-center">
								<button
									onClick={handleLogout}
									className="w-[60%] flex items-center justify-center gap-2 text-sm text-red-600 bg-white rounded-full py-2 shadow hover:bg-gray-100 transition-all duration-150"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M17 16l4-4m0 0l-4-4m4 4H7"
										/>
									</svg>
									Sign Out
								</button>
							</div>
							<div className="mt-8 border-t border-gray-200 text-center text-sm text-gray-400 px-4 py-4 flex justify-center gap-2">
								<span
									onClick={goToPrivacyPolicy}
									className="hover:underline cursor-pointer"
								>
									Privacy policy
								</span>
								|
								<span
									onClick={goToTermsAndConditions}
									className="hover:underline cursor-pointer"
								>
									Terms of service
								</span>
								|
								<span
									onClick={goToVersionControl}
									className="hover:underline cursor-pointer"
								>
									Version
								</span>
							</div>
						</div>
					)}
				</div>
			</div>
			{/* Animation for dropdown */}
			<style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.3s cubic-bezier(.23,1.01,.32,1) both;
        }
      `}</style>
		</nav>
	);
}