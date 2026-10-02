let currentRepairCode = "";
let isRepairValid = false;
let totalRevenue = 0;
let totalRepairs = 0;

do {
    console.log("==========================================");
    console.log("HỆ THỐNG DỊCH VỤ AUTOCARE GARAGE");
    console.log("==========================================");
    console.log("1. Nhập và kiểm chuẩn mã phiếu sửa chữa");
    console.log("2. Tính chi phí sửa chữa");
    console.log("3. Thẩm định mã thẻ khách hàng may mắn");
    console.log("0. Thoát chương trình");
    console.log("==========================================");

    const menuChoice = prompt("Vui lòng nhập lựa chọn của bạn (0 - 3):");

    if (menuChoice === null) {
        break;
    }

    const choice = menuChoice.trim();

    switch (choice) {
        case "1": {
            currentRepairCode = "";
            isRepairValid = false;

            const inputCode = prompt("Nhập mã phiếu sửa chữa:");

            if (inputCode === null) {
                console.log("Chưa nhập mã phiếu sửa chữa.");
                break;
            }

            const repairCode = inputCode.trim().toUpperCase();

            if (repairCode === "") {
                console.log("Chưa nhập mã phiếu sửa chữa.");
                break;
            }

            if (repairCode.length < 6) {
                console.log("Lỗi: Độ dài nhỏ hơn 6 ký tự");
                break;
            }

            if (!repairCode.startsWith("CAR-")) {
                console.log('Lỗi: Sai tiền tố "CAR-"');
                break;
            }

            let hasMiddleSpace = false;

            for (let i = 4; i < repairCode.length; i++) {
                if (repairCode[i] === " ") {
                    hasMiddleSpace = true;
                    break;
                }
            }

            if (hasMiddleSpace) {
                console.log("Lỗi: Chứa khoảng trắng ở giữa");
                break;
            }

            currentRepairCode = repairCode;
            isRepairValid = true;
            console.log(`Hợp lệ: ${currentRepairCode}`);
            break;
        }

        case "2": {
            if (isRepairValid !== true) {
                console.log("Chưa có mã phiếu sửa chữa hợp lệ. Vui lòng chọn Case 1 trước.");
                break;
            }

            let jobCount;
            let pricePerJob;
            let isValidInput = false;

            while (!isValidInput) {
                const jobInput = prompt("Nhập số hạng mục sửa chữa:");

                if (jobInput === null) {
                    break;
                }

                const jobValue = jobInput.trim();

                if (jobValue === "") {
                    console.log("Lỗi: Vui lòng nhập số nguyên > 0.");
                    continue;
                }

                jobCount = Number(jobValue);

                if (Number.isNaN(jobCount) || !Number.isInteger(jobCount) || jobCount <= 0) {
                    console.log("Lỗi: Vui lòng nhập số nguyên > 0.");
                    continue;
                }

                isValidInput = true;
            }

            if (!isValidInput) {
                break;
            }

            isValidInput = false;

            while (!isValidInput) {
                const priceInput = prompt("Nhập đơn giá mỗi hạng mục (VNĐ):");

                if (priceInput === null) {
                    break;
                }

                const priceValue = priceInput.trim();

                if (priceValue === "") {
                    console.log("Lỗi: Vui lòng nhập số nguyên > 0.");
                    continue;
                }

                pricePerJob = Number(priceValue);

                if (Number.isNaN(pricePerJob) || !Number.isInteger(pricePerJob) || pricePerJob <= 0) {
                    console.log("Lỗi: Vui lòng nhập số nguyên > 0.");
                    continue;
                }

                isValidInput = true;
            }

            if (!isValidInput) {
                break;
            }

            const baseCost = jobCount * pricePerJob;
            const discount = jobCount >= 4 ? Math.round(baseCost * 0.1) : 0;
            const wasteFee = Math.round((baseCost - discount) * 0.08);
            const totalPayment = baseCost - discount + wasteFee;

            totalRevenue += totalPayment;
            totalRepairs++;

            console.log("========== HÓA ĐƠN SỬA CHỮA ==========");
            console.log(`Mã phiếu: ${currentRepairCode}`);
            console.log(`Số hạng mục: ${jobCount}`);
            console.log(`Đơn giá mỗi hạng mục: ${pricePerJob} VNĐ`);
            console.log(`Chi phí cơ sở: ${baseCost} VNĐ`);
            console.log(`Tiền giảm giá: ${discount} VNĐ`);
            console.log(`Phí xử lý dầu thải và vật tư: ${wasteFee} VNĐ`);
            console.log(`Tổng thanh toán: ${totalPayment} VNĐ`);
            console.log(`Tổng doanh thu: ${totalRevenue} VNĐ`);
            console.log(`Tổng số phiếu đã thanh toán: ${totalRepairs}`);

            currentRepairCode = "";
            isRepairValid = false;
            break;
        }

        case "3": {
            const cardInput = prompt("Nhập mã số trên thẻ khách hàng:");

            if (cardInput === null) {
                console.log("Lỗi: Chưa nhập mã thẻ.");
                break;
            }

            const cardCode = cardInput.trim();

            if (cardCode.length < 2) {
                console.log("Lỗi: Mã thẻ phải có ít nhất 2 chữ số.");
                break;
            }

            let isAllDigits = true;
            let hasNonZeroDigit = false;
            let digitSum = 0;

            for (let i = 0; i < cardCode.length; i++) {
                const digit = cardCode.charCodeAt(i) - 48;

                if (digit < 0 || digit > 9) {
                    isAllDigits = false;
                    break;
                }

                if (digit !== 0) {
                    hasNonZeroDigit = true;
                }

                digitSum += digit;
            }

            if (!isAllDigits || !hasNonZeroDigit) {
                console.log("Lỗi: Mã thẻ chỉ gồm các chữ số 0-9 và không được toàn số 0.");
                break;
            }

            let reversedCode = "";

            for (let i = cardCode.length - 1; i >= 0; i--) {
                reversedCode += cardCode[i];
            }

            const isSymmetric = cardCode === reversedCode;
            const divisibleByNine = digitSum % 9 === 0;

            let prize = "Không trúng thưởng";

            if (isSymmetric && divisibleByNine) {
                prize = "Giải Đặc biệt - Gói bảo dưỡng định kỳ miễn phí trị giá 1.200.000 VNĐ";
            } else if (isSymmetric) {
                prize = "Giải Nhất - Rửa xe và hút bụi nội thất miễn phí trị giá 200.000 VNĐ";
            } else if (divisibleByNine) {
                prize = "Giải Nhì - Voucher giảm 50.000 VNĐ cho lần sửa chữa kế tiếp";
            }

            console.log("========== KẾT QUẢ ==========");
            console.log(`Mã số gốc: ${cardCode}`);
            console.log(`Mã đảo ngược: ${reversedCode}`);
            console.log(`Tổng chữ số: ${digitSum}`);
            console.log(`Chia hết cho 9: ${divisibleByNine ? "Có" : "Không"}`);
            console.log(`Kết quả: ${prize}`);
            break;
        }

        case "0":
            console.log("Đã thoát chương trình.");
            break;

        case "":
            console.log("Lỗi: Vui lòng chọn từ 0 đến 3.");
            break;

        default:
            console.log("Lỗi: Vui lòng chọn từ 0 đến 3.");
            break;
    }

    if (choice === "0") {
        break;
    }
} while (true);