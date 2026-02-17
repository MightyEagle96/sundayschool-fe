import React, { useEffect } from "react";
import { httpService } from "../../../httpService";
import { useSearchParams } from "react-router-dom";

function ExaminationResults() {
  const [params] = useSearchParams();

  const examination = params.get("examination");
  const getData = async () => {
    const { data } = await httpService("examination/examinationresults", {
      params: { examination },
    });

    if (data) {
      console.log(data);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return <div>hello</div>;
}

export default ExaminationResults;
