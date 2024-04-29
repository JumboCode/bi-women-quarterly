import Link from "next/link"

export default function HomePage() {
    return (
        <div className="h-screen w-full flex flex-col gradient-background">
            <div
                className="flex flex-col justify-center items-center"
                style={{height: "90%"}}
            >
                <div className="flex text-3xl lg:text-4xl xl:text-5xl font-bold text-primary-blue mb-24">
                    BiWomenQuarterly Submission Portal
                </div>
                <div className="flex flex-row justify-center items-center space-x-6">
                    <Link href="/home">
                        <div className="text-md lg:text-lg xl:text-xl text-primary-blue px-4 py-2 rounded-md border-2 border-primary-blue bg-white hover:bg-primary-blue hover:text-white transition duration-300 ease-in-out">
                            Sign In
                        </div>
                    </Link>
                    <Link href="/home">
                        <div className="text-md lg:text-lg xl:text-xl text-primary-blue px-4 py-2 rounded-md border-2 border-primary-blue bg-white hover:bg-primary-blue hover:text-white transition duration-300 ease-in-out">
                            Sign Up
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}