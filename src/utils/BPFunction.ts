export const BPFunction = (val: any) => {
	const f = new BPFunctionData();
	f.objectName = "BP_SkyMaterial_4";
	f.functionName = "SetSkyMat";
	f.paramType = BPFuncParamType.String;
	f.paramValue = "mat" + val;
	__g.misc.callBPFunction(f);
};
export const BPFunction_Xray = (val: any) => {
	const f = new BPFunctionData();
	f.objectName = "suidao_3";
	f.functionName = "setXlight";
	f.paramType = BPFuncParamType.String;
	f.paramValue = "True";
	__g.misc.callBPFunction(f);
	// 4EF36D7A4ED2BD3268CF5CB49132A0BC
};
export const BPFunction_jlg = (boolen: boolean) => {
	const f = new BPFunctionData();
	f.objectName = "JLG_C_1";
	f.functionName = "setJLG";
	f.paramType = BPFuncParamType.String;
	f.paramValue = boolen ? "True" : "False";
	__g.misc.callBPFunction(f);
};
export const BPFunction_hwzz = (boolen: boolean) => {
	const f = new BPFunctionData();
	f.objectName = "texiao_C_2";
	f.functionName = "C";
	f.paramType = BPFuncParamType.String;
	f.paramValue = boolen ? "True" : 'False';
	__g.misc.callBPFunction(f);
};

//入口抬杆
export const BPFunction_taiGanJin = (bool: boolean) => {
	const f = new BPFunctionData();
	f.objectName = "BP_taigan_2";
	f.functionName = "JIN";
	f.paramType = BPFuncParamType.String;
	f.paramValue = bool ? "True" : 'False';
	__g.misc.callBPFunction(f);
}
//出口抬杆
export const BPFunction_taiGanChu = (bool: boolean) => {
	const f = new BPFunctionData();
	f.objectName = "BP_taigan_2";
	f.functionName = "CHU";
	f.paramType = BPFuncParamType.String;
	f.paramValue = bool ? "True" : 'False';
	__g.misc.callBPFunction(f);
}