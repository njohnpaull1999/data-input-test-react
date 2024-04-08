export type UserChildInput = {
  input1: number;
  input2: number;
  input3: number;
  input4: number;
  input5: number;
  input6: number;
  input7: number;
  input8: number;
  input9: number;
  input10: number;
  input11: number;
  input12: number;
  input13: number;
  input14: number;
  input15: number;
  input16: number;
  input17: number;
  input18: number;
  input19: number;
  input20: number;
};

export type UserParentInput = {
  sumA: {
    value: number;
    isEntered: boolean;
  };
  multiplyB: {
    value: number;
    isEntered: boolean = false;
  };
};

export type UserInput = UserParentInput & UserChildInput;

export type JsonRequest = {
  data: {
    sumA: number;
    multiplyB: number;
  };
};
