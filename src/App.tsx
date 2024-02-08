// library imports
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// components
import Loading from "./components/Loading";
import Footer from "./components/Footer";

const url = "https://api.adviceslip.com/advice";

function App() {
	const { isPending, error, data, refetch, isFetching } = useQuery({
		queryKey: ["advice"],
		queryFn: async () => {
			return axios(url);
		},
	});

	const handleClickAdvice = () => {
		refetch();
	};

	if (error) {
		return (
			<div className="flex flex-col items-center justify-center h-screen bg-neutral-darkBlue">
				<div className="text-center text-white">
					An error occurred: {error.message}
				</div>
			</div>
		);
	}

	return (
		<main className="flex flex-col items-center justify-center h-screen bg-neutral-darkBlue">
			<section className="bg-neutral-darkGrayishBlue rounded-xl text-sm font-medium font-manrope tracking-widest w-[90%] max-w-[500px]">
				<h1 className="flex items-center justify-center mt-10 mb-6 uppercase text-primary-neonGreen">
					Advice #{data?.data.slip?.id}
				</h1>
				{isPending || isFetching ? (
					<div className="flex items-center justify-center m-10">
						<Loading />
					</div>
				) : (
					<h2 className="px-4 pb-6 text-2xl font-extrabold text-center text-primary-lightCyan">
						"{data?.data.slip?.advice}"
					</h2>
				)}

				<img
					src="/images/pattern-divider-mobile.svg"
					alt=""
					className="block pb-10 m-auto md:hidden"
				/>
				<img
					src="/images/pattern-divider-desktop.svg"
					alt=""
					className="hidden pb-10 m-auto md:block"
				/>
				<div className="relative flex items-center justify-center mt-6">
					<button
						onClick={handleClickAdvice}
						type="submit"
						className="absolute flex items-center justify-center w-16 h-16 p-4 transform -translate-x-1/2 rounded-full hover:shadow-2xl hover:shadow-primary-neonGreen bg-primary-neonGreen -top-8 left-1/2"
					>
						<img src="/images/icon-dice.svg" alt="" />
					</button>
				</div>
			</section>

			<Footer />
		</main>
	);
}

export default App;
