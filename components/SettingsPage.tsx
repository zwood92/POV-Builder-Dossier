import React from 'react';

const SettingsPage: React.FC = () => {
  return (
    <div className="flex-1 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap justify-between gap-3 p-4 mb-8">
          <p className="text-[#111418] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">Settings</p>
        </div>
        <section className="mb-12" id="profile">
          <div className="p-4 mb-6 @container bg-white dark:bg-[#1a2835] rounded-xl border border-[#DEE2E6] dark:border-gray-700">
            <div className="flex w-full flex-col gap-4 @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
              <div className="flex gap-4">
                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC7lmfpZ8wyRS4UuUU5mupnyce30hBGA0xcbzUR8-AqSdjDImt8S_0383uUE1Ns6S-WZBFiUvJVEBHUkTCxtdwl0yg7nJeBM-V03l9mU9RGOP54chprTHZT3rW-qrWAwxG2AgAr9QlQ-oHdc1CZC4b_OIMIzEMRTIeeKFzeDIy-xISwvO7s-QfH1JrNSH9p5VfzpXOkTjTWbBTUfCDvmA25sTfVv_NksMvpnJ8tnIduUwVO3nja-QoOFgxXaMf6aQT14Q-qpF8LU3Aw")'}}></div>
                <div className="flex flex-col justify-center">
                  <p className="text-[#111418] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">John Doe</p>
                  <p className="text-[#617589] dark:text-gray-400 text-base font-normal leading-normal">john.doe@example.com</p>
                </div>
              </div>
              <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-100 dark:bg-gray-700 text-[#111418] dark:text-gray-200 text-sm font-bold leading-normal tracking-[0.015em] w-full max-w-[480px] @[480px]:w-auto hover:bg-gray-200 dark:hover:bg-gray-600">
                <span className="truncate">Change Picture</span>
              </button>
            </div>
          </div>
          <div className="bg-white dark:bg-[#1a2835] rounded-xl border border-[#DEE2E6] dark:border-gray-700 p-6">
            <h3 className="text-xl font-bold mb-6 text-[#111418] dark:text-white">Personal Information</h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="flex flex-col">
                <p className="text-[#111418] dark:text-gray-300 text-base font-medium leading-normal pb-2">Full Name</p>
                <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-[#101922] focus:border-primary dark:focus:border-primary h-14 placeholder:text-[#617589] p-[15px] text-base font-normal leading-normal" value="John Doe"/>
              </label>
              <label className="flex flex-col">
                <p className="text-[#111418] dark:text-gray-300 text-base font-medium leading-normal pb-2">Email Address</p>
                <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-[#101922] focus:border-primary dark:focus:border-primary h-14 placeholder:text-[#617589] p-[15px] text-base font-normal leading-normal" value="john.doe@example.com"/>
              </label>
            </form>
            <div className="mt-6 pt-6 border-t border-[#DEE2E6] dark:border-gray-700 flex justify-end">
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90">
                <span className="truncate">Save Changes</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
