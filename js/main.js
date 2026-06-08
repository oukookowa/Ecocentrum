function calculateEstimate(){

    const serviceElement =
        document.getElementById("serviceType");

    const hoursElement =
        document.getElementById("hours");

    const resultElement =
        document.getElementById("result");

    if(
        !serviceElement ||
        !hoursElement ||
        !resultElement
    ){
        return;
    }

    const service = serviceElement.value;
    const hours =
        Math.max(0, parseFloat(hoursElement.value) || 0);

    let rate = 0;

    switch(service){

        case "household-basic":
            rate = 24;
            break;

        case "household-premium":
            rate = 29.5;
            break;

        case "office":
            rate = 30;
            break;

        case "hospitality":
            rate = 32;
            break;

        case "industrial":
            rate = 42;
            break;

        default:
            rate = 0;

    }

    const total = rate * hours;

    resultElement.innerText =
        "€" +
        total.toFixed(2) +
        " / month";
}