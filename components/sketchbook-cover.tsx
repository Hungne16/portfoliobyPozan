import PencilArt from './pencil-art';
import { LocalText } from './pozan-system';

export default function SketchbookCover() {
  return <aside className="sketchbook-cover" aria-label="Studio sketchbook">
    <div className="cover-caption"><span>FIG. 01 / THE STUDIO</span><span>↙ POZAN’S FIELD NOTES</span></div>
    <div className="cover-sheet">
      <span className="paper-tape" aria-hidden="true" />
      <div className="cover-sheet-top"><span>DESIGN / CODE / REPEAT</span><span>01—∞</span></div>
      <PencilArt />
      <p className="hand-note"><LocalText vi="Từ nét vẽ đầu tiên…" en="It starts with a sketch…" /></p>
      <svg className="cover-scribble" viewBox="0 0 300 24" fill="none" aria-hidden="true"><path d="M4 16Q115 2 286 9M21 21Q150 9 299 17" stroke="currentColor" strokeWidth="1.6" /></svg>
    </div>
    <div className="cover-bottom">
      <div className="cover-stamp" aria-hidden="true">THINK<br /><b>MAKE</b><br />REFINE ↻</div>
      <div className="cover-note"><PencilArt variant="notes" /><span className="hand-note"><LocalText vi="Ý tưởng đang thành hình." en="Ideas, taking shape." /></span></div>
    </div>
  </aside>;
}
