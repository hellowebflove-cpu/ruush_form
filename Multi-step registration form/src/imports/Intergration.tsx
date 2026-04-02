import svgPaths from "./svg-y0ot824xyi";
import imgImage115 from "figma:asset/2bfd49f3cce98e4e45b582918b81ae847c47d63e.png";

function Group() {
  return (
    <div className="absolute contents left-[1607px] top-[50.72px]">
      <div className="absolute bg-white h-[0.844px] left-[1607px] top-[50.72px] w-[22px]" />
      <div className="absolute bg-white h-[0.844px] left-[1607px] top-[58.11px] w-[22px]" />
    </div>
  );
}

function Group1() {
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
      <Group />
    </div>
  );
}

function Group2() {
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

function Group3() {
  return (
    <div className="absolute contents left-[1441px] top-[37px]">
      <Group2 />
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

function Group4() {
  return (
    <div className="absolute contents left-[80px] top-[25px]">
      <Group1 />
      <Group3 />
      <LogoRed />
    </div>
  );
}

export default function Intergration() {
  return (
    <div className="bg-[#0f0e0f] relative size-full" data-name="intergration">
      <Group4 />
      <div className="-translate-x-1/2 absolute h-[812px] left-[calc(50%-2px)] rounded-[20px] top-[178px] w-[598px]" data-name="image 115">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[20px] size-full" src={imgImage115} />
      </div>
    </div>
  );
}