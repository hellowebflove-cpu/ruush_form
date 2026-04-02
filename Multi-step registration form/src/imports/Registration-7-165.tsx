import svgPaths from "./svg-iuv3fxfe7r";

function Group2() {
  return (
    <div className="absolute contents left-[1607px] top-[50.72px]">
      <div className="absolute bg-white h-[0.844px] left-[1607px] top-[50.72px] w-[22px]" />
      <div className="absolute bg-white h-[0.844px] left-[1607px] top-[58.11px] w-[22px]" />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents left-[1585px] top-[37px]">
      <div className="absolute h-[38px] left-[1585px] top-[37px] w-[63px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 63 38">
          <g id="Rectangle 128">
            <path d={svgPaths.p240de2b2} fill="url(#paint0_linear_1_1011)" fillOpacity="0.1" />
            <path d={svgPaths.p1fd1c900} stroke="var(--stroke-0, white)" strokeOpacity="0.15" strokeWidth="0.5" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_1011" x1="-3.5" x2="68.8252" y1="-12.1389" y2="51.2905">
              <stop stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <Group2 />
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute h-[38px] left-[1441px] top-[37px] w-[120px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 120 38">
        <g id="Group 113">
          <path d={svgPaths.p2065b400} fill="url(#paint0_linear_1_1050)" fillOpacity="0.1" id="Rectangle 128" stroke="var(--stroke-0, #E74C41)" strokeWidth="0.5" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_1050" x1="-6.66667" x2="57.6308" y1="-12.1389" y2="95.2687">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0.05" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents left-[1441px] top-[37px]">
      <Group5 />
      <p className="-translate-x-1/2 absolute font-['Roboto_Mono:Regular',sans-serif] font-normal h-[27.444px] leading-[normal] left-[1500.5px] text-[#d0cac3] text-[20px] text-center top-[41.22px] w-[73px]">Увійти</p>
    </div>
  );
}

function LogoRed() {
  return (
    <div className="absolute h-[54px] left-[80px] top-[25px] w-[87px]" data-name="logo_red (1) 1">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 87 54">
        <g clipPath="url(#clip0_1_1002)" id="logo_red (1) 1">
          <path d={svgPaths.p13ece8f0} fill="var(--fill-0, #D0CAC3)" id="Vector" />
          <path d={svgPaths.p368a6700} fill="var(--fill-0, #D0CAC3)" id="Vector_2" />
          <path d={svgPaths.p1cabc580} fill="var(--fill-0, #D0CAC3)" id="Vector_3" />
          <path d={svgPaths.p3b47cd00} fill="var(--fill-0, #D0CAC3)" id="Vector_4" />
          <path d={svgPaths.pa105400} fill="var(--fill-0, #D0CAC3)" id="Vector_5" />
          <path d={svgPaths.p297a4200} fill="var(--fill-0, #D0CAC3)" id="Vector_6" />
          <path d={svgPaths.p185caf80} fill="var(--fill-0, #D0CAC3)" id="Vector_7" />
        </g>
        <defs>
          <clipPath id="clip0_1_1002">
            <rect fill="white" height="54" width="87" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute contents left-[80px] top-[25px]">
      <Group4 />
      <Group6 />
      <LogoRed />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-center relative shrink-0 text-center w-[572px]">
      <p className="font-['Roboto_Mono:Bold_Italic',sans-serif] font-bold italic leading-[normal] relative shrink-0 text-[#d0cac3] text-[52px] uppercase w-[594px]">Створення рахунку</p>
      <p className="font-['Roboto_Mono:Regular',sans-serif] font-normal leading-[1.5] min-w-full relative shrink-0 text-[22px] text-[rgba(208,202,195,0.6)] w-[min-content]">Вкажіть назву юридичної особи, на яку необхідно створити рахунок</p>
    </div>
  );
}

function Group8() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="bg-[#1e1d1d] col-1 h-[80px] ml-0 mt-0 rounded-[20px] row-1 w-[600px]" />
      <p className="col-1 font-['Roboto_Mono:Regular',sans-serif] font-normal leading-[normal] ml-[573px] mt-[9px] relative row-1 text-[#e74c41] text-[22px] whitespace-nowrap">*</p>
      <p className="col-1 font-['Roboto_Mono:Regular',sans-serif] font-normal leading-[normal] ml-[27.49px] mt-[25px] relative row-1 text-[22px] text-[rgba(208,202,195,0.6)] whitespace-nowrap">Юр. особа</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[602px]">
      <Group8 />
    </div>
  );
}

function Group() {
  return (
    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1">
      <div className="bg-[#e74c41] col-1 h-[82px] ml-0 mt-0 rounded-[1000px] row-1 w-[501px]" />
      <p className="col-1 font-['Roboto_Mono:Regular',sans-serif] font-normal leading-[normal] ml-[125.5px] mt-[24px] relative row-1 text-[26px] text-white uppercase whitespace-nowrap">створити рахунок</p>
    </div>
  );
}

function Group7() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Group />
    </div>
  );
}

function Frame3() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col gap-[48px] items-center left-1/2 top-[calc(50%-156px)] w-[764px]">
      <Frame1 />
      <Frame2 />
      <Group7 />
    </div>
  );
}

function Group1() {
  return (
    <div className="col-1 h-[64px] ml-0 mt-0 relative row-1 w-[176px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 176 64">
        <g id="Group 21">
          <circle cx="32" cy="32" fill="var(--fill-0, #1E1D1D)" id="Ellipse 4" r="32" />
          <circle cx="144" cy="32" fill="var(--fill-0, #1E1D1D)" id="Ellipse 5" r="32" />
        </g>
      </svg>
    </div>
  );
}

function IcOutlineWhatsapp() {
  return (
    <div className="col-1 ml-[15px] mt-[15px] relative row-1 size-[33px]" data-name="ic:outline-whatsapp">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33 33">
        <g id="ic:outline-whatsapp">
          <path d={svgPaths.pef26000} fill="var(--fill-0, #E74C41)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function HumbleiconsMail() {
  return (
    <div className="col-1 ml-[128px] mt-[15px] relative row-1 size-[34px]" data-name="humbleicons:mail">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
        <g id="humbleicons:mail">
          <path d={svgPaths.p808c480} id="Vector" stroke="var(--stroke-0, #E74C41)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Group3() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Group1 />
      <IcOutlineWhatsapp />
      <HumbleiconsMail />
    </div>
  );
}

function Frame() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[32px] items-center left-[calc(50%-17px)] top-[831px] w-[568px]">
      <p className="font-['Roboto_Mono:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#d0cac3] text-[22px] text-center whitespace-nowrap">Маєте запитання? Будемо раді поспілкуватися</p>
      <Group3 />
    </div>
  );
}

export default function Registration() {
  return (
    <div className="bg-[#0f0e0f] relative size-full" data-name="registration">
      <Group9 />
      <Frame3 />
      <p className="absolute font-['Roboto_Mono:Regular',sans-serif] font-normal leading-[0] left-[563px] text-[#d0cac3] text-[22px] top-[648px] w-[600px]">
        <span className="leading-[1.5]">{`Якщо вам необхідно створити договір, або індивідуалізувати рахунок напишіть нам на пошту `}</span>
        <span className="leading-[1.5] text-[#e74c41]">{`finance@ruuush.marketing `}</span>
      </p>
      <Frame />
    </div>
  );
}