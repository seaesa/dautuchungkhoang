/* =========================================================
   Mock data — thay bằng API thật khi tích hợp backend.
   Giá cổ phiếu tính theo nghìn đồng (24.80 = 24.800 đ).
   ========================================================= */
window.APP_DATA = (function () {
  const indices = [
    { code: "VN-Index", value: 1281.45, change: 12.36 },
    { code: "VN30", value: 1342.21, change: 15.82 },
    { code: "HNX", value: 246.8, change: 2.14 },
    { code: "UPCoM", value: 95.12, change: -0.18 },
  ];

  const tickers = [
    { code: "MBB", name: "Ngân hàng TMCP Quân Đội", sector: "Ngân hàng", price: 24.8, change: 1.3, color: "#1e3a8a", news: 120 },
    { code: "SSI", name: "CTCP Chứng khoán SSI", sector: "Chứng khoán", price: 32.1, change: 1.2, color: "#d71920", news: 99 },
    { code: "VCB", name: "Ngân hàng TMCP Ngoại thương Việt Nam", sector: "Ngân hàng", price: 92.4, change: 0.4, color: "#0f7a3d", news: 76 },
    { code: "VNM", name: "CTCP Sữa Việt Nam", sector: "Thực phẩm", price: 72.5, change: 0.5, color: "#1d4ed8", news: 65 },
    { code: "FPT", name: "CTCP FPT", sector: "Công nghệ", price: 142.0, change: 0.7, color: "#f37021", news: 58 },
    { code: "HPG", name: "CTCP Tập đoàn Hòa Phát", sector: "Thép", price: 27.3, change: -0.4, color: "#b91c1c", news: 52 },
    { code: "TCB", name: "Ngân hàng TMCP Kỹ thương Việt Nam", sector: "Ngân hàng", price: 23.9, change: 0.8, color: "#dc2626", news: 48 },
    { code: "VIC", name: "Tập đoàn Vingroup", sector: "Bất động sản", price: 44.2, change: -1.1, color: "#9f1239", news: 41 },
    { code: "VHM", name: "CTCP Vinhomes", sector: "Bất động sản", price: 41.5, change: 0.0, color: "#be123c", news: 37 },
    { code: "STB", name: "Ngân hàng TMCP Sài Gòn Thương Tín", sector: "Ngân hàng", price: 31.2, change: 1.6, color: "#1e40af", news: 32 },
    { code: "REE", name: "CTCP Cơ điện lạnh", sector: "Điện", price: 68.0, change: -0.8, color: "#0369a1", news: 18 },
  ];

  // Khóa học. level: chỉ số cấp độ trong lộ trình
  const courses = [
    { id: "co-ban", title: "Chứng khoán cho người mới", tag: "Cơ bản", tone: "green", lessons: 12, rating: 4.9, hours: 3, art: "candles", level: 0 },
    { id: "phan-tich-doanh-nghiep", title: "Phân tích doanh nghiệp", tag: "Phân tích", tone: "violet", lessons: 20, rating: 4.9, hours: 6, art: "skyline-sunset", level: 1 },
    { id: "phan-tich-nganh", title: "Phân tích ngành", tag: "Phân tích", tone: "pink", lessons: 15, rating: 4.7, hours: 4.5, art: "towers", level: 2 },
    { id: "phan-tich-vi-mo", title: "Phân tích vĩ mô", tag: "Vĩ mô", tone: "orange", lessons: 12, rating: 4.8, hours: 4, art: "skyline-night", level: 3 },
    { id: "doc-bao-cao-tai-chinh", title: "Đọc hiểu báo cáo tài chính", tag: "Phân tích", tone: "violet", lessons: 14, rating: 4.8, hours: 5, art: "bars", level: 1 },
    { id: "phan-tich-ky-thuat", title: "Phân tích kỹ thuật thực chiến", tag: "Kỹ thuật", tone: "blue", lessons: 18, rating: 4.7, hours: 6, art: "candles", level: 1 },
    { id: "quan-tri-rui-ro", title: "Quản trị rủi ro và vốn", tag: "Danh mục", tone: "green", lessons: 9, rating: 4.9, hours: 2.5, art: "pie", level: 4 },
    { id: "xay-dung-danh-muc", title: "Xây dựng danh mục đầu tư", tag: "Danh mục", tone: "green", lessons: 8, rating: 4.8, hours: 3, art: "towers", level: 4 },
  ];

  const path = [
    {
      title: "Người mới bắt đầu",
      color: "#16a34a",
      desc: "Nắm những kiến thức nền tảng về thị trường chứng khoán để tự tin đặt lệnh đầu tiên.",
      lessons: [
        { t: "Chứng khoán là gì?", m: 12 },
        { t: "Cổ phiếu là gì? Quyền lợi của cổ đông", m: 10 },
        { t: "VN-Index được tính như thế nào?", m: 15 },
        { t: "Ba sàn HOSE, HNX và UPCoM khác nhau ra sao", m: 12 },
        { t: "Cách mở tài khoản chứng khoán", m: 14 },
        { t: "Các loại lệnh: LO, ATO, ATC, MP", m: 16 },
        { t: "Phí giao dịch, thuế và chu kỳ thanh toán T+2", m: 11 },
        { t: "Đọc bảng giá điện tử", m: 18 },
        { t: "Biên độ dao động và giá tham chiếu", m: 9 },
        { t: "Bài tập: đặt lệnh mô phỏng đầu tiên", m: 20 },
      ],
    },
    {
      title: "Phân tích doanh nghiệp",
      color: "#1e5bd8",
      desc: "Đọc báo cáo tài chính, đánh giá chất lượng lợi nhuận và định giá một doanh nghiệp niêm yết.",
      lessons: [
        { t: "Ba báo cáo tài chính cốt lõi", m: 18 },
        { t: "Bảng cân đối kế toán", m: 20 },
        { t: "Báo cáo kết quả kinh doanh", m: 16 },
        { t: "Lưu chuyển tiền tệ: tiền thật nằm ở đâu", m: 18 },
        { t: "Các chỉ số ROE, ROA, biên lợi nhuận", m: 15 },
        { t: "Định giá bằng P/E và P/B", m: 17 },
        { t: "Mô hình chiết khấu dòng tiền (DCF) cơ bản", m: 22 },
        { t: "Lợi thế cạnh tranh và ban lãnh đạo", m: 14 },
        { t: "Dấu hiệu cảnh báo trong báo cáo tài chính", m: 16 },
        { t: "Phân tích ngành ngân hàng", m: 20 },
        { t: "Phân tích doanh nghiệp sản xuất", m: 18 },
        { t: "Case study: phân tích một mã từ A đến Z", m: 30 },
      ],
    },
    {
      title: "Phân tích ngành",
      color: "#f08a1c",
      desc: "Hiểu chu kỳ ngành, động lực tăng trưởng và cách chọn ngành dẫn dắt thị trường.",
      lessons: [
        { t: "Chu kỳ ngành và chu kỳ kinh tế", m: 16 },
        { t: "Ngân hàng: tín dụng, NIM và nợ xấu", m: 18 },
        { t: "Bất động sản: quỹ đất và pháp lý", m: 17 },
        { t: "Thép: giá nguyên liệu và đầu ra", m: 14 },
        { t: "Chứng khoán: thanh khoản và margin", m: 13 },
        { t: "Bán lẻ và tiêu dùng", m: 15 },
        { t: "Điện, dầu khí và tiện ích", m: 16 },
        { t: "Xây dựng bảng so sánh ngành", m: 20 },
      ],
    },
    {
      title: "Phân tích vĩ mô",
      color: "#7c3aed",
      desc: "Theo dõi lãi suất, tỷ giá, lạm phát và dòng vốn để hiểu bức tranh lớn của thị trường.",
      lessons: [
        { t: "GDP, lạm phát và tác động lên chứng khoán", m: 15 },
        { t: "Chính sách tiền tệ và lãi suất", m: 18 },
        { t: "Tỷ giá và dòng vốn ngoại", m: 16 },
        { t: "Fed và thị trường thế giới", m: 14 },
        { t: "Giá hàng hóa: dầu, thép, nông sản", m: 13 },
        { t: "Đầu tư công và tăng trưởng tín dụng", m: 15 },
        { t: "Đọc lịch sự kiện kinh tế", m: 10 },
        { t: "Câu chuyện nâng hạng thị trường", m: 14 },
        { t: "Kịch bản vĩ mô và phân bổ tài sản", m: 18 },
        { t: "Bài tập: viết nhận định vĩ mô tháng", m: 25 },
      ],
    },
    {
      title: "Xây dựng danh mục",
      color: "#e0393e",
      desc: "Kết hợp mọi kiến thức để xây dựng, theo dõi và tái cân bằng danh mục phù hợp với mục tiêu của bạn.",
      lessons: [
        { t: "Xác định mục tiêu và khẩu vị rủi ro", m: 14 },
        { t: "Đa dạng hóa đúng cách", m: 15 },
        { t: "Phân bổ tỷ trọng theo niềm tin", m: 16 },
        { t: "Điểm mua, điểm bán và cắt lỗ", m: 18 },
        { t: "Quản lý vốn khi dùng margin", m: 14 },
        { t: "Theo dõi và tái cân bằng", m: 12 },
        { t: "Tâm lý đầu tư và kỷ luật", m: 15 },
        { t: "Nhật ký giao dịch", m: 10 },
      ],
    },
  ];

  const news = [
    { id: 1, ticker: "MBB", cat: "doanh-nghiep", market: "doanh-nghiep", title: "MBB công bố KQKD quý III/2026: lợi nhuận trước thuế tăng 18%", date: "10/10/2026 14:32", excerpt: "Ngân hàng TMCP Quân Đội báo lãi trước thuế quý III tăng 18% so với cùng kỳ nhờ tăng trưởng tín dụng và thu nhập dịch vụ.", art: "building" },
    { id: 2, ticker: "MBB", cat: "co-ban", market: "doanh-nghiep", title: "Cơ hội tăng trưởng từ mảng bán lẻ và số hóa", date: "09/10/2026 10:18", excerpt: "Tệp khách hàng số tiếp tục mở rộng, giúp chi phí vốn duy trì ở mức thấp so với nhóm ngân hàng tư nhân.", art: "building" },
    { id: 3, ticker: "MBB", cat: "su-kien", market: "thi-truong", title: "MBB được khối ngoại mua ròng hơn 200 tỷ đồng", date: "08/10/2026 16:42", excerpt: "Khối ngoại quay lại mua ròng cổ phiếu ngân hàng, trong đó MBB dẫn đầu với giá trị hơn 200 tỷ đồng.", art: "building-2" },
    { id: 4, ticker: "MBB", cat: "ky-thuat", market: "thi-truong", title: "Cập nhật biểu đồ kỹ thuật MBB: xu hướng tăng vẫn được duy trì", date: "07/10/2026 09:05", excerpt: "Giá giữ vững trên đường MA50, thanh khoản cải thiện. Vùng hỗ trợ gần nhất quanh 23.500 đồng.", art: "chart" },
    { id: 5, ticker: "MBB", cat: "co-ban", market: "doanh-nghiep", title: "Định giá MBB sau quý III: P/B vẫn dưới trung bình 5 năm", date: "05/10/2026 08:30", excerpt: "So với nhóm ngân hàng cùng quy mô, MBB đang giao dịch ở mức P/B thấp hơn trong khi ROE thuộc nhóm cao nhất.", art: "chart" },
    { id: 6, ticker: "SSI", cat: "doanh-nghiep", market: "doanh-nghiep", title: "SSI dự kiến phát hành thêm cổ phiếu để tăng vốn", date: "10/10/2026 11:20", excerpt: "Hội đồng quản trị thông qua phương án phát hành, nâng vốn điều lệ để mở rộng dư nợ cho vay ký quỹ.", art: "building" },
    { id: 7, ticker: "SSI", cat: "ky-thuat", market: "thi-truong", title: "Cổ phiếu chứng khoán bứt phá khi thanh khoản thị trường tăng mạnh", date: "09/10/2026 15:10", excerpt: "Nhóm chứng khoán đồng loạt tăng giá khi tổng giá trị giao dịch toàn thị trường vượt 20.000 tỷ đồng.", art: "chart" },
    { id: 8, ticker: "VCB", cat: "doanh-nghiep", market: "doanh-nghiep", title: "VCB giữ vị trí ngân hàng có lợi nhuận cao nhất hệ thống", date: "08/10/2026 13:00", excerpt: "Lợi nhuận 9 tháng ước đạt mức cao nhất toàn ngành, tỷ lệ bao phủ nợ xấu duy trì trên 200%.", art: "building-2" },
    { id: 9, ticker: "FPT", cat: "doanh-nghiep", market: "doanh-nghiep", title: "FPT ký hợp đồng chuyển đổi số trị giá lớn tại Nhật Bản", date: "07/10/2026 09:45", excerpt: "Mảng dịch vụ công nghệ thông tin nước ngoài tiếp tục là động lực tăng trưởng chính của tập đoàn.", art: "building" },
    { id: 10, ticker: "HPG", cat: "co-ban", market: "doanh-nghiep", title: "HPG: Dung Quất 2 vận hành, sản lượng thép quý IV dự kiến tăng mạnh", date: "06/10/2026 10:00", excerpt: "Khu liên hợp mới giúp nâng công suất thép thô, mở ra dư địa tăng trưởng cho năm tới.", art: "building-2" },
    { id: 11, ticker: "VNM", cat: "su-kien", market: "doanh-nghiep", title: "VNM chốt quyền trả cổ tức đợt 1 bằng tiền", date: "05/10/2026 08:00", excerpt: "Cổ đông sẽ nhận cổ tức tiền mặt vào cuối tháng, tỷ suất cổ tức tương đương khoảng 2%.", art: "building" },
    { id: 20, ticker: null, cat: "thi-truong", market: "thi-truong", title: "VN-Index tăng hơn 12 điểm, thanh khoản vượt 20.000 tỷ đồng", date: "10/10/2026 15:05", excerpt: "Thị trường tiếp tục hồi phục trong phiên hôm nay với sự dẫn dắt của nhóm ngân hàng và chứng khoán.", art: "chart" },
    { id: 21, ticker: null, cat: "vi-mo", market: "vi-mo", title: "Ngân hàng Nhà nước giữ nguyên lãi suất điều hành", date: "09/10/2026 17:00", excerpt: "Mặt bằng lãi suất ổn định tiếp tục hỗ trợ tăng trưởng tín dụng trong quý cuối năm.", art: "building-2" },
    { id: 22, ticker: null, cat: "quoc-te", market: "quoc-te", title: "Fed giữ nguyên lãi suất, thị trường phản ứng tích cực", date: "09/10/2026 07:30", excerpt: "Chứng khoán Mỹ tăng điểm sau thông điệp thận trọng nhưng không quá diều hâu từ Fed.", art: "chart" },
    { id: 23, ticker: null, cat: "quoc-te", market: "quoc-te", title: "Giá dầu thế giới giảm xuống dưới 80 USD/thùng", date: "08/10/2026 08:15", excerpt: "Lo ngại về nhu cầu khiến giá dầu Brent quay đầu giảm, tác động tới nhóm cổ phiếu dầu khí.", art: "chart" },
    { id: 24, ticker: null, cat: "thi-truong", market: "thi-truong", title: "Khối ngoại mua ròng hơn 500 tỷ đồng trên HOSE", date: "08/10/2026 15:20", excerpt: "Dòng vốn ngoại trở lại mua ròng phiên thứ ba liên tiếp, tập trung vào nhóm ngân hàng và bán lẻ.", art: "building" },
    { id: 25, ticker: null, cat: "vi-mo", market: "vi-mo", title: "CPI tháng 9 tăng 0,3%, lạm phát vẫn trong tầm kiểm soát", date: "06/10/2026 09:00", excerpt: "Lạm phát bình quân 9 tháng thấp hơn mục tiêu, tạo dư địa cho chính sách tiền tệ.", art: "chart" },
  ];

  const newsCategories = [
    { id: "all", label: "Tất cả" },
    { id: "doanh-nghiep", label: "Tin doanh nghiệp" },
    { id: "ky-thuat", label: "Phân tích kỹ thuật" },
    { id: "co-ban", label: "Phân tích cơ bản" },
    { id: "su-kien", label: "Sự kiện" },
  ];

  const brokers = [
    { id: "ssi", name: "SSI", note: "Đội ngũ uy tín", color: "#d71920", bg: "#fff1f1" },
    { id: "vps", name: "VPS", note: "Phí giao dịch thấp", color: "#e21b23", bg: "#fff4f0" },
    { id: "mbs", name: "MBS", note: "Nền tảng mạnh", color: "#1e3a8a", bg: "#eef3ff" },
    { id: "tcbs", name: "TCBS", note: "Nhiều ưu đãi", color: "#e3262e", bg: "#fff1f1" },
    { id: "hsc", name: "HSC", note: "Hỗ trợ tốt", color: "#0b3c8c", bg: "#eef3ff" },
    { id: "kis", name: "KIS", note: "Dịch vụ chuyên nghiệp", color: "#0f4c81", bg: "#eef6ff" },
  ];

  return { indices, tickers, courses, path, news, newsCategories, brokers };
})();
