import React, { useState } from 'react';
import { AppLayer, DesignMode, UiState } from '../../types';
import { MTTQ_IMAGES, NEWS_ARTICLES_SAMPLE, RESIDENTIAL_GROUPS_27, UPCOMING_SCHEDULE } from '../../data/mockData';
import { UxAnnotationBox } from '../common/UxAnnotationBox';
import { ArrowRight, CalendarDays, ChevronRight, MapPin, Search, Send, ShieldCheck, Users } from 'lucide-react';

interface PublicHomeViewProps {
  designMode: DesignMode;
  uiState: UiState;
  showAnnotations: boolean;
  onNavigate: (layer: AppLayer) => void;
  onSelectTdp: (tdpId: number) => void;
}

const storyImages = [MTTQ_IMAGES.supervisionField, MTTQ_IMAGES.charityWelfare, MTTQ_IMAGES.culturalFestival];

export const PublicHomeView: React.FC<PublicHomeViewProps> = ({ designMode, uiState, showAnnotations, onNavigate, onSelectTdp }) => {
  const [quickSearch, setQuickSearch] = useState('');
  const filteredTdp = RESIDENTIAL_GROUPS_27.filter((tdp) => {
    const query = quickSearch.trim().toLocaleLowerCase('vi');
    return query && [tdp.name, tdp.coverage, tdp.leaderName].some((value) => value.toLocaleLowerCase('vi').includes(query));
  });

  return (
    <div className={`govuk-screen govuk-home ${designMode === 'LO_FI_WIREFRAME' ? 'govuk-low-fi' : ''}`}>
      {showAnnotations && <UxAnnotationBox
        layerCode="W1"
        layerName="Trang chủ Cổng thông tin Mặt trận Tổ quốc phường Cầu Giấy"
        targetUser="Người dân, hội viên đoàn thể và người cao tuổi tra cứu thông tin phường"
        keyGoal="Đọc tin nổi bật, tìm tổ dân phố và gửi ý kiến trong ít bước"
        pokaYokeRules={['Ưu tiên một tin nổi bật và các tin có ảnh minh họa', 'Tìm tổ dân phố ngay trên trang chủ', 'Hiển thị rõ cam kết phản hồi ý kiến trong 7 ngày']}
        apiSource="GET /api/v1/mttq/public-home"
        slaRule="Cập nhật tin và thông báo mới trong vòng 24 giờ"
      />}

      <section className="govuk-home-hero" aria-labelledby="home-title">
        <div className="govuk-home-hero-copy">
          <p className="govuk-kicker">ỦY BAN MẶT TRẬN TỔ QUỐC VIỆT NAM · PHƯỜNG CẦU GIẤY</p>
          <h1 id="home-title">Đại đoàn kết, lắng nghe và hành động vì Nhân dân</h1>
          <p className="govuk-lead">Cập nhật hoạt động Mặt trận, theo dõi công tác giám sát và kết nối với 27 tổ dân phố trên địa bàn.</p>
          <div className="govuk-actions">
            <button className="govuk-button govuk-button-primary" onClick={() => onNavigate('W14_MAILBOX')}><Send size={18} /> Gửi ý kiến</button>
            <button className="govuk-button govuk-button-secondary" onClick={() => onNavigate('W6_TDP_MAP')}><MapPin size={18} /> Tìm tổ dân phố</button>
          </div>
          <div className="govuk-home-facts"><span><Users size={18} /> 27 tổ dân phố</span><span><ShieldCheck size={18} /> Giám sát cộng đồng</span></div>
        </div>
        <figure className="govuk-home-hero-image">
          <img src={MTTQ_IMAGES.cauGiayCongress} alt="Đại hội đại biểu Mặt trận Tổ quốc phường Cầu Giấy" />
          <figcaption>Đại hội đại biểu MTTQ phường Cầu Giấy · Nhiệm kỳ 2026–2031</figcaption>
        </figure>
      </section>

      <section className="govuk-section" aria-labelledby="news-title">
        <div className="govuk-section-heading">
          <div><p className="govuk-kicker">TIN TỨC · SỰ KIỆN</p><h2 id="news-title">Hoạt động Mặt trận</h2></div>
          <button className="govuk-text-link" onClick={() => onNavigate('VISUAL_PORTAL')}>Xem tất cả tin <ArrowRight size={17} /></button>
        </div>
        <div className="govuk-news-grid">
          {NEWS_ARTICLES_SAMPLE.slice(0, 3).map((article, index) => (
            <article className={`govuk-news-card ${index === 0 ? 'govuk-news-featured' : ''}`} key={article.id}>
              <img src={storyImages[index]} alt="" loading={index === 0 ? 'eager' : 'lazy'} />
              <div className="govuk-news-copy">
                <p className="govuk-news-meta">{article.category} <span>·</span> {article.date}</p>
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
                {index === 0 && <button className="govuk-text-link" onClick={() => onNavigate('L3_SUPERVISION')}>Đọc thông tin giám sát <ArrowRight size={17} /></button>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="govuk-tdp-panel" aria-labelledby="tdp-title">
        <div className="govuk-tdp-heading"><div><p className="govuk-kicker">BẢN ĐỒ SỐ CẦU GIẤY</p><h2 id="tdp-title">Tìm tổ dân phố của bạn</h2><p>Nhập tên tổ, tuyến phố hoặc Trưởng ban Công tác Mặt trận.</p></div><img src={MTTQ_IMAGES.culturalHouse} alt="Nhà văn hóa tổ dân phố tại Cầu Giấy" /></div>
        <label className="govuk-search-label" htmlFor="tdp-search">Tên tổ dân phố hoặc tuyến phố</label>
        <div className="govuk-search-row"><Search size={20} aria-hidden="true" /><input id="tdp-search" value={quickSearch} onChange={(event) => setQuickSearch(event.target.value)} placeholder="Ví dụ: Duy Tân, Chùa Hà, ngõ 165…" /><button className="govuk-button govuk-button-primary" onClick={() => onNavigate('W6_TDP_MAP')}>Mở bản đồ</button></div>
        {quickSearch && <div className="govuk-search-results" aria-live="polite">{filteredTdp.length ? filteredTdp.slice(0, 5).map((tdp) => <button key={tdp.id} onClick={() => onSelectTdp(tdp.id)}><span><strong>{tdp.name}</strong><small>{tdp.coverage} · Trưởng ban: {tdp.leaderName}</small></span><ChevronRight size={18} /></button>) : <p>Chưa tìm thấy tổ dân phố phù hợp. Gọi 024.3768.1201 để được hướng dẫn.</p>}</div>}
      </section>

      <section className="govuk-lower-grid">
        <div className="govuk-section">
          <div className="govuk-section-heading"><div><p className="govuk-kicker">LỊCH CÔNG TÁC</p><h2>Hoạt động sắp tới</h2></div><CalendarDays size={24} /></div>
          <div className="govuk-schedule-list">{UPCOMING_SCHEDULE.slice(0, 3).map((item) => <article key={item.id}><time>{item.date}<br /><strong>{item.time}</strong></time><div><h3>{item.title}</h3><p>{item.location}</p></div></article>)}</div>
        </div>
        <aside className="govuk-mailbox-panel"><img src={MTTQ_IMAGES.charityWelfare} alt="Hoạt động an sinh xã hội tại phường Cầu Giấy" /><div><p className="govuk-kicker">HÒM THƯ SỐ</p><h2>Lắng nghe Nhân dân nói</h2><p>Gửi phản ánh, kiến nghị tới Mặt trận. Cam kết tiếp nhận và phản hồi trong 7 ngày làm việc.</p><button className="govuk-button govuk-button-primary" onClick={() => onNavigate('W14_MAILBOX')}>Gửi ý kiến <ArrowRight size={17} /></button></div></aside>
      </section>

      <div className="govuk-home-unit-link"><span><strong>Thông tin Ủy ban MTTQ phường</strong><small>Ban Thường trực · 67 Ủy viên · 12 tổ chức thành viên</small></span><button className="govuk-button govuk-button-secondary" onClick={() => onNavigate('L2_MTTQ_UNIT')}>Xem trang đơn vị <ChevronRight size={18} /></button></div>
      <span className="sr-only">Trạng thái giao diện: {uiState}</span>
    </div>
  );
};
