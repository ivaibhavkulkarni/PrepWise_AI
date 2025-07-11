"use client"

import { useState } from "react"
import { APP_FEATURES } from "../utils/data"
import { useNavigate } from "react-router-dom"
import { LuSparkles } from "react-icons/lu"
import Login from "./Auth/Login"
import SignUp from "./Auth/SignUp"
import Modal from "../components/Modal"
import { useContext } from "react"
import { UserContext } from "../context/userContext"
import ProfileInfoCard from "../components/Cards/ProfileInfoCard"
import '../components/Animations/animations.css'

const LandingPage = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const [openAuthModal, setOpenAuthModal] = useState(false)
  const [currentPage, setCurrentPage] = useState("login")

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true)
    } else {
      navigate("/dashboard")
    }
  }

  return (
    <>
      <div className="w-full min-h-full relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20">
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Primary floating gradient */}
          <div className="w-[600px] h-[600px] bg-gradient-to-r from-blue-200/40 via-purple-200/30 to-pink-200/40 blur-[80px] absolute -top-32 -left-32 z-0 animate-float-slow"></div>

          {/* Secondary floating gradient */}
          <div className="w-[400px] h-[400px] bg-gradient-to-r from-amber-200/50 via-orange-200/40 to-red-200/30 blur-[60px] absolute top-1/4 right-0 z-0 animate-float-reverse"></div>

          {/* Tertiary floating gradient */}
          <div className="w-[350px] h-[350px] bg-gradient-to-r from-green-200/30 via-teal-200/40 to-cyan-200/50 blur-[70px] absolute bottom-1/4 left-1/3 z-0 animate-float-diagonal"></div>

          {/* Moving gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer z-0"></div>
        </div>

        <div className="container mx-auto px-4 pt-6 pb-[200px] relative z-10">
          {/* Header */}
          <header className="flex justify-between items-center mb-16 backdrop-blur-sm bg-white/20 rounded-2xl p-4 border border-white/30 shadow-lg">
            <div className="text-xl text-black font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PrepWise AI
            </div>
            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className="bg-gradient-to-r from-[#FF9324] via-[#e99a4b] to-[#FF6B6B] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:shadow-xl hover:scale-105 border border-white/50 transition-all duration-300 cursor-pointer backdrop-blur-sm"
                onClick={() => setOpenAuthModal(true)}
              >
                Login / Sign Up
              </button>
            )}
          </header>

          {/* Hero Content */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
              <div className="flex items-center justify-left mb-2">
                <div className="flex items-center gap-2 text-[13px] text-amber-700 font-semibold bg-gradient-to-r from-amber-100/80 to-yellow-100/80 px-3 py-1 rounded-full border border-amber-300/50 backdrop-blur-sm shadow-md animate-pulse-gentle">
                  <LuSparkles className="animate-spin-slow" /> AI Powered
                </div>
              </div>
              <h1 className="text-5xl text-black font-medium mb-6 leading-tight">
                Ace Interview with <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9324] via-[#FCD760] to-[#FF6B6B] bg-[length:200%_200%] animate-gradient-x font-semibold">
                  AI-Powered
                </span>{" "}
                Learning
              </h1>
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-[17px] text-gray-800 mr-0 md:mr-20 mb-6 backdrop-blur-sm bg-white/30 p-4 rounded-xl border border-white/40">
                Get role-specific questions, expand answers when you need them, dive deeper into concepts, and organize
                everything your way. From preparation to mastery - your ultimate interview toolkit is here.
              </p>
              <button
                className="bg-gradient-to-r from-[#FF9324] via-[#e99a4b] to-[#FF6B6B] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:shadow-xl hover:scale-105 border border-white/50 transition-all duration-300 cursor-pointer backdrop-blur-sm"
                onClick={handleCTA}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full min-h-full relative z-10 bg-gradient-to-b from-white via-gray-50/50 to-blue-50/30">
        {/* Additional floating elements for features section */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="w-[300px] h-[300px] bg-gradient-to-r from-indigo-200/30 to-purple-200/30 blur-[50px] absolute top-10 right-10 z-0 animate-float-slow"></div>
          <div className="w-[250px] h-[250px] bg-gradient-to-r from-pink-200/30 to-rose-200/30 blur-[40px] absolute bottom-20 left-10 z-0 animate-float-reverse"></div>
        </div>

        <div className="w-full min-h-full mt-10 relative z-10">
          <div className="container mx-auto px-4 pt-10 pb-20">
            <section className="mt-5">
              <h2 className="text-2xl font-medium text-center mb-12 bg-gradient-to-r from-gray-800 via-black to-gray-800 bg-clip-text text-transparent">
                Features That Make You Shine
              </h2>
              <div className="flex flex-col items-center gap-8">
                {/* First 3 Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                  {APP_FEATURES.slice(0, 3).map((feature) => (
                    <div
                      key={feature.id}
                      className="bg-gradient-to-br from-white/80 via-white/60 to-blue-50/40 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 backdrop-blur-sm hover:scale-105 hover:bg-gradient-to-br hover:from-white/90 hover:to-purple-50/50"
                    >
                      <h3 className="text-base font-semibold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {feature.title}
                      </h3>
                      <p className="text-gray-700">{feature.description}</p>
                    </div>
                  ))}
                </div>
                {/* Remaining two cards*/}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {APP_FEATURES.slice(3).map((feature) => (
                    <div
                      key={feature.id}
                      className="bg-gradient-to-br from-white/80 via-white/60 to-green-50/40 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 backdrop-blur-sm hover:scale-105 hover:bg-gradient-to-br hover:from-white/90 hover:to-teal-50/50"
                    >
                      <h3 className="text-base font-semibold mb-3 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                        {feature.title}
                      </h3>
                      <p className="text-gray-700">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="text-sm bg-gradient-to-r from-gray-100 via-white to-gray-100 text-gray-600 text-center p-5 mt-5 border-t border-gray-200/50 backdrop-blur-sm">
          Made with ❤️... Happy Coding
        </div>
      </div>
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false)
          setCurrentPage("login")
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
        </div>
      </Modal>
    </>
  )
}

export default LandingPage
