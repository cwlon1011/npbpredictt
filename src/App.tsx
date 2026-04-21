import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Activity, MapPin, Loader2, BarChart3, TrendingUp, Info, ChevronRight } from 'lucide-react';
import { Team, Pitcher, Matchup, PredictionResult, DailyMatchup } from './types';
import { TEAMS, SAMPLE_PITCHERS, SAMPLE_BATTERS, DAILY_SCHEDULE } from './data/npb-data';
import { predictMatch } from './services/gemini';

export default function App() {
  const [currentView, setCurrentView] = useState<'prediction' | 'analytics' | 'standings' | 'stadiums'>('analytics');
  const [selectedMatchupId, setSelectedMatchupId] = useState<string | null>(null);
  const [homeTeam, setHomeTeam] = useState<Team>(TEAMS[0]);
  const [awayTeam, setAwayTeam] = useState<Team>(TEAMS[1]);
  const [homePitcher, setHomePitcher] = useState<Pitcher>(SAMPLE_PITCHERS.find(p => p.teamId === TEAMS[0].id) || SAMPLE_PITCHERS[0]);
  const [awayPitcher, setAwayPitcher] = useState<Pitcher>(SAMPLE_PITCHERS.find(p => p.teamId === TEAMS[1].id) || SAMPLE_PITCHERS[1]);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);

  const handleMatchupSelect = (match: DailyMatchup) => {
    const hTeam = TEAMS.find(t => t.id === match.homeTeamId)!;
    const aTeam = TEAMS.find(t => t.id === match.awayTeamId)!;
    const hPitcher = SAMPLE_PITCHERS.find(p => p.id === match.homePitcherId)!;
    const aPitcher = SAMPLE_PITCHERS.find(p => p.id === match.awayPitcherId)!;
    
    setHomeTeam(hTeam);
    setAwayTeam(aTeam);
    setHomePitcher(hPitcher);
    setAwayPitcher(aPitcher);
    setSelectedMatchupId(match.id);
  };

  const handlePredict = async () => {
    setLoading(true);
    setPrediction(null);
    setCurrentView('prediction');
    try {
      const matchup: Matchup = {
        homeTeam,
        awayTeam,
        homePitcher,
        awayPitcher,
        stadium: homeTeam.stadium,
        date: new Date().toLocaleDateString()
      };
      const result = await predictMatch(matchup);
      setPrediction(result);
    } catch (error) {
      console.error(error);
      alert('預測出錯，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden selection:bg-emerald-500/30 font-sans">
      {/* Sidebar Nav */}
      <nav className="w-20 border-r border-white/10 bg-white/5 backdrop-blur-xl flex flex-col items-center py-6 gap-8 shrink-0 z-50">
        <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center font-bold text-xl shadow-lg shadow-emerald-600/20 cursor-pointer" onClick={() => setCurrentView('prediction')}>NPB</div>
        <div className="flex flex-col gap-6">
          <NavItem 
            active={currentView === 'analytics'} 
            onClick={() => setCurrentView('analytics')} 
            icon={<BarChart3 size={20} />} 
          />
          <NavItem 
            active={currentView === 'prediction'} 
            onClick={() => setCurrentView('prediction')} 
            icon={<Activity size={20} />} 
          />
          <NavItem 
            active={currentView === 'standings'} 
            onClick={() => setCurrentView('standings')} 
            icon={<Trophy size={20} />} 
          />
          <NavItem 
            active={currentView === 'stadiums'} 
            onClick={() => setCurrentView('stadiums')} 
            icon={<MapPin size={20} />} 
          />
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto custom-scrollbar relative">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1 flex items-center gap-3">
              NPB <span className="text-emerald-400">AI Prediction Engine</span>
              <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 bg-emerald-400/10 rounded border border-emerald-400/20">Live Analysis</span>
            </h1>
            <p className="text-slate-400 text-sm">Season 2026 • Game Day Analysis • Tokyo Standard Time</p>
          </div>
          <div className="flex gap-4 text-xs font-medium">
            <div className="px-4 py-2 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
              League: <span className="text-amber-400 font-bold ml-1">Central / Pacific</span>
            </div>
            <div className="px-4 py-2 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
              View: <span className="text-emerald-400 font-bold ml-1 uppercase tracking-tighter">{currentView}</span>
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {currentView === 'prediction' && (
            <motion.div 
              key="prediction"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              {/* Daily Matchups Ticker */}
              <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar no-scrollbar scroll-smooth">
                {DAILY_SCHEDULE.map((m) => {
                  const hTeam = TEAMS.find(t => t.id === m.homeTeamId)!;
                  const aTeam = TEAMS.find(t => t.id === m.awayTeamId)!;
                  const isActive = selectedMatchupId === m.id;
                  return (
                    <motion.div 
                      key={m.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleMatchupSelect(m)}
                      className={`shrink-0 glass-panel p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col gap-2 min-w-[200px] ${isActive ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-white/5 hover:border-white/20'}`}
                    >
                      <div className="flex justify-between items-center text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        <span>{m.time} TST</span>
                        <span>{m.stadium}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-black text-xs">{aTeam.name[0]}</div>
                          <span className="text-[10px] font-bold">{aTeam.name.slice(0, 2)}</span>
                        </div>
                        <span className="text-xs font-black text-slate-600">VS</span>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center font-black text-xs text-emerald-400">{hTeam.name[0]}</div>
                          <span className="text-[10px] font-bold">{hTeam.name.slice(0, 2)}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
                <div className="md:col-span-8 space-y-6">
                <div className="glass-panel rounded-[2.5rem] p-4 md:p-10 relative overflow-hidden flex flex-col justify-center min-h-[450px]">
                  <div className="absolute top-0 right-0 p-8 text-[11px] text-white/5 uppercase tracking-[0.5em] font-black pointer-events-none select-none">SYSTEM_CONFIG</div>
                  
                  <div className="flex flex-col lg:flex-row justify-between items-center gap-12 relative z-10">
                    {/* Away Team */}
                    <TeamSelector 
                      team={awayTeam} 
                      pitcher={awayPitcher} 
                      onTeamChange={(id) => {
                        const t = TEAMS.find(team => team.id === id)!;
                        setAwayTeam(t);
                        setAwayPitcher(SAMPLE_PITCHERS.find(p => p.teamId === t.id) || SAMPLE_PITCHERS[0]);
                      }}
                      onPitcherChange={(id) => setAwayPitcher(SAMPLE_PITCHERS.find(p => p.id === id)!)}
                      type="Away"
                    />

                    <div className="flex flex-col items-center justify-center p-6 bg-emerald-500/10 rounded-full border border-emerald-500/20 shrink-0 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                      <span className="text-emerald-400 font-black text-lg italic tracking-tighter">VS</span>
                    </div>

                    {/* Home Team */}
                    <TeamSelector 
                      team={homeTeam} 
                      pitcher={homePitcher} 
                      onTeamChange={(id) => {
                        const t = TEAMS.find(team => team.id === id)!;
                        setHomeTeam(t);
                        setHomePitcher(SAMPLE_PITCHERS.find(p => p.teamId === t.id) || SAMPLE_PITCHERS[0]);
                      }}
                      onPitcherChange={(id) => setHomePitcher(SAMPLE_PITCHERS.find(p => p.id === id)!)}
                      type="Home"
                      glow
                    />
                  </div>
                </div>

                <div className="glass-panel rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20 text-emerald-400">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 font-black uppercase block tracking-widest mb-0.5">Arena Environment</span>
                      <span className="font-bold text-lg text-slate-100">{homeTeam.stadium}</span>
                    </div>
                  </div>
                  <button 
                    onClick={handlePredict}
                    disabled={loading}
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 active:scale-95 disabled:bg-slate-800 disabled:opacity-50 text-white font-black px-12 py-4 rounded-xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-emerald-900/20 border border-emerald-400/30"
                  >
                    {loading ? <Loader2 className="animate-spin" size={24} /> : <Activity size={24} />}
                    {loading ? '深度神經網路分析中...' : '生成 AI 全面預測報告'}
                  </button>
                </div>

                {/* Stadium Analysis Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <StadiumPerformanceCard 
                    teamName={awayTeam.name} 
                    stadium={homeTeam.stadium} 
                    winRate={awayTeam.stats.stadiumPerformance[homeTeam.stadium] || 0.45} 
                  />
                  <StadiumPerformanceCard 
                    teamName={homeTeam.name} 
                    stadium={homeTeam.stadium} 
                    winRate={homeTeam.stats.stadiumPerformance[homeTeam.stadium] || 0.50} 
                  />
                </div>
              </div>

              <div className="md:col-span-4 space-y-8">
                {prediction ? (
                  <PredictionCard result={prediction} />
                ) : (
                  <div className="h-[400px] flex flex-col items-center justify-center p-12 glass-panel rounded-[2rem] text-slate-500 border-dashed border-white/5">
                    {loading ? (
                      <div className="text-center space-y-6">
                        <div className="relative">
                          <Loader2 size={56} className="animate-spin mx-auto text-emerald-400" />
                          <div className="absolute inset-0 blur-xl bg-emerald-400/20 animate-pulse rounded-full" />
                        </div>
                        <div className="space-y-2">
                          <p className="font-black uppercase tracking-[0.3em] text-[10px] text-emerald-400">Syncing Neurons</p>
                          <p className="text-xs text-slate-400 font-medium">比對球員歷史數據中...</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center space-y-6 group">
                        <Trophy size={64} className="mx-auto opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
                        <div className="space-y-1">
                          <p className="text-xs font-black uppercase tracking-[0.2em]">Ready for Analysis</p>
                          <p className="text-[10px] text-slate-600 font-bold uppercase">Select matchup to begin</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <SmallStandings />
              </div>
            </div>
          </motion.div>
        )}

          {currentView === 'standings' && (
            <motion.div
              key="standings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-panel rounded-[2rem] p-8"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3 text-slate-100">
                  <Trophy className="text-amber-400" /> 2026 Season Standings
                </h2>
                <div className="flex gap-2">
                   <span className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-[10px] font-bold uppercase tracking-widest">Central</span>
                   <span className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-[10px] font-bold uppercase tracking-widest">Pacific</span>
                </div>
              </div>
              <FullStandingsTable />
            </motion.div>
          )}

          {currentView === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                  <div className="glass-panel p-8 rounded-[2rem] relative overflow-hidden">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                        <TrendingUp className="text-emerald-400" /> 2026 每日投打趨勢分析
                      </h2>
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded border border-emerald-500/20 font-bold uppercase">Real-time Update</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <AnalyticsTrendCard title="聯盟平均安打率 (AVG)" value="0.258" delta="+0.004" />
                      <AnalyticsTrendCard title="聯盟平均防禦率 (ERA)" value="3.42" delta="-0.02" negative />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                     <DailyLeaderBoard title="打擊王 (Batting Leaders)" data={SAMPLE_BATTERS.sort((a,b) => b.avg - a.avg).slice(0, 5)} type="batting" />
                     <DailyLeaderBoard title="防禦率王 (ERA Leaders)" data={SAMPLE_PITCHERS.sort((a,b) => a.era - b.era).slice(0, 5)} type="pitching" />
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="glass-panel p-6 rounded-[2rem] border-emerald-500/20">
                    <h3 className="font-black text-xs uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
                       <BarChart3 size={16} className="text-emerald-400" /> 本日賽事熱點
                    </h3>
                    <div className="space-y-4">
                      {TEAMS.slice(0, 4).map((t, i) => (
                        <div key={t.id} className="p-4 bg-white/5 rounded-2xl border border-white/5 flex justify-between items-center group cursor-pointer hover:bg-white/10 transition-all">
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-black">{t.name[0]}</span>
                            <span className="font-bold text-sm">{t.name}</span>
                          </div>
                          <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <SmallStandings />
                </div>
              </div>
            </motion.div>
          )}

          {currentView === 'stadiums' && (
            <motion.div
              key="stadiums"
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {TEAMS.map(team => (
                <div key={team.id} className="glass-panel p-6 rounded-2xl space-y-4 hover:border-emerald-500/30 transition-all cursor-pointer group">
                  <div className="h-32 bg-white/5 rounded-xl flex items-center justify-center overflow-hidden border border-white/5">
                    <span className="text-white/20 font-black text-2xl uppercase tracking-widest group-hover:scale-110 transition-transform duration-500">{team.stadium}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-100">{team.stadium}</h3>
                    <p className="text-xs text-slate-500">{team.city} • Home of {team.name}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/10">Neutral Factors</span>
                    <span className="text-[9px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/10">Standard Size</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="mt-20 py-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
            <div className="text-[11px] font-black text-slate-600 uppercase tracking-[0.5em] mb-1">
              © 2026 NPB PREDICTOR INTELLIGENCE PRO
            </div>
            <div className="text-[9px] text-slate-700 font-bold uppercase tracking-widest">
              Advanced Neural Analysis for NPB Enthusiasts
            </div>
          </div>
          <div className="flex gap-10">
            <FooterLink label="Security Protocols" />
            <FooterLink label="Data Architecture" />
            <FooterLink label="API Access" />
          </div>
        </footer>
      </main>
    </div>
  );
}

function TeamSelector({ team, pitcher, onTeamChange, onPitcherChange, type, glow }: any) {
  return (
    <div className="flex flex-col items-center w-full lg:w-[280px] text-center space-y-6">
      <TeamLogo letter={team.name[0]} color={glow ? "bg-emerald-600" : "bg-slate-700"} glow={glow} />
      
      <div className="w-full space-y-1">
        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{type} SQUAD</label>
        <div className="relative group">
          <select 
            value={team.id}
            onChange={(e) => onTeamChange(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xl font-black text-center outline-none focus:border-emerald-500/50 transition-all cursor-pointer appearance-none text-slate-100 hover:bg-white/[0.07]"
          >
            {TEAMS.map(t => <option key={t.id} value={t.id} className="bg-slate-900 text-white">{t.name}</option>)}
          </select>
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none opacity-40">
            <ChevronRight size={16} className="rotate-90" />
          </div>
        </div>
        <p className="text-slate-500 text-[11px] mt-1 font-mono uppercase tracking-widest font-black">{team.stats.wins}W - {team.stats.losses}L - {team.stats.draws}T</p>
      </div>
      
      <div className="w-full space-y-4 pt-6 border-t border-white/5">
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-1 h-1 rounded-full bg-emerald-400 group-animate-pulse" />
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Pitcher</label>
          </div>
          <div className="relative">
            <select
              value={pitcher.id}
              onChange={(e) => onPitcherChange(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-center outline-none hover:border-white/20 transition-colors cursor-pointer appearance-none text-slate-300"
            >
              {SAMPLE_PITCHERS.filter(p => p.teamId === team.id).map(p => (
                <option key={p.id} value={p.id} className="bg-slate-900 text-white">{p.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <MiniStat label="ERA INDEX" value={pitcher?.era?.toFixed(2) || '-'} />
          <MiniStat label="WHIP" value={pitcher?.whip?.toFixed(2) || '-'} />
        </div>
      </div>
    </div>
  );
}

function PredictionCard({ result }: { result: PredictionResult }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel rounded-[2.5rem] p-8 border-emerald-500/30 relative overflow-hidden shadow-[0_30px_60px_-15px_rgba(16,185,129,0.1)]"
    >
      <div className="absolute top-0 right-0 p-8 text-[10px] text-emerald-400/20 uppercase tracking-[0.3em] font-black select-none">AI_ANALYSIS_v3</div>
      
      <div className="mb-10">
        <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] block mb-3">Model Prediction</span>
        <h2 className="text-4xl font-black text-emerald-400 uppercase tracking-tighter leading-none">{result.winner}</h2>
        <div className="flex items-center gap-4 mt-6">
          <div className="flex-1 h-2.5 bg-white/5 rounded-full overflow-hidden shadow-inner border border-white/5">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${result.probability * 100}%` }}
              className="h-full bg-emerald-500 relative shadow-[0_0_20px_rgba(16,185,129,0.6)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </motion.div>
          </div>
          <span className="font-mono font-black text-emerald-400 text-lg">{(result.probability * 100).toFixed(0)}%</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="bg-white/5 p-5 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center group">
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-1">O/U Target</span>
          <div className="text-2xl font-black text-slate-100 tracking-tight">
            {result.overUnder === 'Over' ? '大分' : '小分'}
          </div>
          <div className="w-full mt-2 h-1 bg-white/5 rounded-full overflow-hidden">
             <div className="h-full bg-amber-500" style={{ width: `${result.overUnderProbability * 100}%` }} />
          </div>
          <span className="text-[8px] font-bold text-slate-600 mt-1 uppercase">{(result.overUnderProbability * 100).toFixed(0)}% Confidence</span>
        </div>
        <div className="bg-white/5 p-5 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center">
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-1">Proj. Score</span>
          <div className="text-2xl font-black text-slate-100 tracking-tight">{result.projectedTotal}</div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
        <h3 className="text-[11px] font-black text-slate-500 uppercase flex items-center gap-2 tracking-[0.2em]">
          <TrendingUp size={16} className="text-emerald-400" /> Analyst Insight
        </h3>
        <p className="text-slate-300 leading-relaxed text-sm font-medium italic border-l-2 border-emerald-500/20 pl-4 py-1">
          "{result.reasoning}"
        </p>
      </div>
    </motion.div>
  );
}

function SmallStandings() {
  return (
    <div className="glass-panel rounded-[2rem] overflow-hidden flex flex-col border border-white/5">
      <div className="p-5 border-b border-white/5 font-black text-[10px] uppercase tracking-[0.3em] flex justify-between items-center text-slate-500">
        <span>Quick Table</span>
        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Synced</span>
      </div>
      <div className="max-h-[280px] overflow-y-auto custom-scrollbar">
        <table className="w-full text-left text-[11px]">
          <tbody className="divide-y divide-white/[0.03]">
            {TEAMS.slice(0, 6).map((team) => (
              <tr key={team.id} className="hover:bg-white/[0.03] transition-colors group">
                <td className="p-4 flex items-center gap-3 font-bold text-slate-200">
                  <div className={`w-1.5 h-1.5 rounded-full ${team.league === 'Central' ? 'bg-orange-500' : 'bg-blue-400'} group-hover:scale-125 transition-transform`} />
                  {team.name}
                </td>
                <td className="p-4 font-mono text-slate-500 font-bold">
                  {team.stats.wins}-{team.stats.losses}
                </td>
                <td className="p-4 text-right">
                  <span className={`font-mono font-black ${team.stats.winRate > 0.5 ? 'text-emerald-400' : 'text-slate-600'}`}>
                    .{team.stats.winRate.toString().split('.')[1]?.padEnd(3, '0')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FullStandingsTable() {
  return (
    <div className="overflow-x-auto text-slate-200">
      <table className="w-full text-left">
        <thead>
          <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/10">
            <th className="p-6">Position</th>
            <th className="p-6">Squad</th>
            <th className="p-6">League</th>
            <th className="p-6">W - L - T</th>
            <th className="p-6">Win Rate</th>
            <th className="p-6">AVG Runs</th>
            <th className="p-6">Team ERA</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {TEAMS.sort((a, b) => b.stats.winRate - a.stats.winRate).map((team, idx) => (
            <tr key={team.id} className="hover:bg-white/5 transition-colors group">
              <td className="p-6 font-mono font-black text-lg text-white/20 group-hover:text-emerald-400 transition-colors">#{idx + 1}</td>
              <td className="p-6">
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center font-black text-xs border border-white/10">{team.name[0]}</span>
                  <span className="font-bold text-lg">{team.name}</span>
                </div>
              </td>
              <td className="p-6">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${team.league === 'Central' ? 'text-orange-500 border-orange-500/20 bg-orange-500/10' : 'text-blue-400 border-blue-400/20 bg-blue-400/10'}`}>
                  {team.league}
                </span>
              </td>
              <td className="p-6 font-mono font-bold text-slate-400">{team.stats.wins} - {team.stats.losses} - {team.stats.draws}</td>
              <td className="p-6 font-mono font-black text-emerald-400">.{team.stats.winRate.toString().split('.')[1]?.padEnd(3, '0')}</td>
              <td className="p-6 font-bold text-slate-300">{team.stats.avgRuns}</td>
              <td className="p-6 font-bold text-slate-300">{team.stats.era}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AnalyticsTrendCard({ title, value, delta, negative }: { title: string, value: string, delta: string, negative?: boolean }) {
  return (
    <div className="bg-white/5 p-6 rounded-2xl border border-white/5 space-y-2">
      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{title}</span>
      <div className="flex items-end justify-between">
        <span className="text-3xl font-black text-slate-100">{value}</span>
        <span className={`text-xs font-bold ${negative ? 'text-emerald-400' : 'text-emerald-400'}`}>
          {delta}
        </span>
      </div>
    </div>
  );
}

function DailyLeaderBoard({ title, data, type }: { title: string, data: any[], type: 'batting' | 'pitching' }) {
  return (
    <div className="glass-panel p-6 rounded-[2rem]">
      <h3 className="font-black text-xs uppercase tracking-widest text-slate-500 mb-6">{title}</h3>
      <div className="space-y-4">
        {data.map((item, idx) => (
          <div key={item.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
            <div className="flex items-center gap-3">
              <span className="text-xs font-black text-white/20 w-4">#{idx + 1}</span>
              <span className="font-bold text-sm text-slate-200">{item.name}</span>
            </div>
            <span className="font-mono font-black text-emerald-400">
              {type === 'batting' ? item.avg.toFixed(3).replace('0.', '.') : item.era.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsCard({ title, icon }: { title: string, icon: React.ReactNode }) {
  return (
    <div className="glass-panel p-8 rounded-[2rem] space-y-6 hover:border-emerald-500/30 transition-all group">
      <div className="flex items-center justify-between">
        <h3 className="font-black uppercase tracking-tight text-lg text-slate-100">{title}</h3>
        <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:scale-110 transition-transform">{icon}</div>
      </div>
      <div className="h-40 bg-white/5 rounded-[1.5rem] flex items-center justify-center border border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-400/5 to-transparent" />
        <div className="flex gap-2 items-end px-6 w-full h-24">
          {[40, 70, 45, 90, 65, 80, 55, 60, 75, 50].map((h, i) => (
            <motion.div 
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: i * 0.1 }}
              className="flex-1 bg-white/10 rounded-t-sm"
            />
          ))}
        </div>
        <p className="absolute bottom-4 right-6 text-[10px] font-black text-slate-600 uppercase tracking-widest animate-pulse">Processing Streams...</p>
      </div>
      <p className="text-xs text-slate-500 leading-relaxed font-bold uppercase tracking-wide">
        Aggregating sensor data from all stadiums. Analyzing flight characteristics and pitcher fatigue intervals for 2026 season.
      </p>
    </div>
  );
}

function TeamLogo({ letter, color, glow }: { letter: string, color: string, glow?: boolean }) {
  return (
    <div className={`w-28 h-28 ${color} rounded-[2rem] flex items-center justify-center border border-white/10 relative group transition-transform hover:scale-105 duration-500 shadow-2xl`}>
      <span className="text-5xl font-black text-white">{letter}</span>
      {glow && (
        <div className={`absolute inset-0 ${color} blur-3xl opacity-20 -z-10 animate-pulse`} />
      )}
      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-black/40 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
        <Info size={14} className="text-white/60" />
      </div>
    </div>
  );
}

function NavItem({ icon, active, onClick }: { icon: React.ReactNode, active: boolean, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`w-12 h-12 rounded-2xl flex items-center justify-center cursor-pointer transition-all relative group ${active ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-white/5 text-slate-500 hover:bg-white/10 hover:text-slate-300 border border-transparent'}`}
    >
      {icon}
      {active && <motion.div layoutId="sidebar-active" className="absolute -left-1 w-1 h-6 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]" />}
      {!active && (
        <div className="absolute left-16 px-3 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10 whitespace-nowrap z-50">
          Navigation Tool
        </div>
      )}
    </div>
  );
}

function MiniStat({ label, value }: { label: string, value: string }) {
  return (
    <div className="bg-white/5 rounded-xl py-2 px-3 border border-white/5 hover:border-white/10 transition-colors text-center">
      <span className="text-[9px] font-black text-slate-600 uppercase block leading-none mb-1 tracking-widest">{label}</span>
      <span className="text-xs font-black text-slate-300 font-mono tracking-tighter">{value}</span>
    </div>
  );
}

function StadiumPerformanceCard({ teamName, stadium, winRate }: { teamName: string, stadium: string, winRate: number }) {
  return (
    <div className="glass-panel p-4 rounded-xl border border-white/5">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{teamName} 於 {stadium}</span>
        <span className={`text-xs font-black ${(winRate * 100) >= 50 ? 'text-emerald-400' : 'text-slate-400'}`}>
          {(winRate * 100).toFixed(1)}% 勝率
        </span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${winRate * 100}%` }}
          className={`h-full ${winRate >= 0.5 ? 'bg-emerald-500' : 'bg-slate-500'}`}
        />
      </div>
    </div>
  );
}

function FooterLink({ label }: { label: string }) {
  return (
    <a href="#" className="text-[10px] font-black text-slate-500 hover:text-emerald-400 transition-colors uppercase tracking-[0.3em] cursor-pointer">
      {label}
    </a>
  );
}

// End of file

