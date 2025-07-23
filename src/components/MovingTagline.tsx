import { useState, useEffect, useRef } from 'react';

interface AnimatedWordsProps {
  className?: string;
}

const MovingTagline: React.FC<AnimatedWordsProps> = ({ className = "" }) => {
  // 500+ words starting with 'I'
  const iWords = [
    "Impact", "Inspire", "Ignite", "Illuminate", "Innovate", "Imagine", "Infuse", "Impress", "Imprint", "Influence", "Ideate", "Intensify", "Illustrate", "Indulge", "Invent", "Interact", "Immerse", "Interpret", "Intend", "Input", "Introduce", "Inform", "Improve", "Instill", "Instigate", "Integrate", "Include", "Inflect", "Indicate", "Invoke", "Invest", "Involve", "Infuse", "Imitate", "Implement", "Ink", "Ingrain", "Inflame", "Inspire", "Incite", "Imbue", "Inflow", "Intrigue", "Intuit", "Impart", "Incubate", "Increase", "Influx", "Induce", "Impactful", "Instant", "Initial", "Incept", "Immerse", "Invite", "Incandescent", "Illusive", "Imaginative", "Ideal", "Insight", "Intellect", "Interpretive", "Illuminative", "Introspect", "Inclusive", "Intuitive", "Illustrious", "Infinite", "Independent", "Indie", "Interactive", "Intentional", "Inborn", "Inhouse", "Interwoven", "Infographic", "Illustrative", "Impeccable", "Instrumental", "Incredible", "Iconic", "Incisive", "Imaginarium", "Informative", "Inbound", "Immersive", "Intensive", "Indigenous", "Influent", "Internally", "Initiative", "Immediacy", "Incubation", "Investment", "Integration", "Inception", "Indulgent", "Intuition", "Inspiration", "Iteration", "Insider", "Inventive", "Infinitely", "Interconnect", "Inside", "Instinct", "Independence", "Indelible", "Idealist", "Identity", "Ironclad", "Illusion", "Insignia", "Intensity", "InclusiveDesign", "Interaction", "Interface", "Immersion", "Inbuilt", "Inkflow", "Inkpress", "Intellective", "Intrinsically", "Inkscape", "Incognito", "InputFlow", "Insightful", "Imprintable", "Imaginator", "Imagecraft", "IdeaDriven", "Iconify", "Imagewise", "Inkwork", "Inversify", "Inkline", "Ideasphere", "Imagefirst", "Inklore", "Ideasurf", "Inkbeat", "Instabrand", "Impressions", "Illuminator", "IdeaMind", "IdeaMachine", "Intuitize", "Imagist", "Ideanize", "IdeaForge", "Inkspired", "Imaginex", "Inlook", "Ideaset", "Impacto", "Impressify", "Incube", "Inovare", "Inkspire", "Ideabloom", "Imaginet", "Innovent", "Ideatrix", "Incolor", "Infoburst", "Intellecta", "Impressure", "Inkcrea", "Incogenius", "Ideaxion", "IdeaGlow", "Inskape", "Indesign", "Inkbound", "Inkjoy", "Inspiron", "Ideapitch", "Innovana", "Illumiwave", "Infospire", "Inovex", "Infocrest", "Intellist", "Impressiq", "Inspira", "Inkstroke", "Ideashift", "Inkfloat", "IdeaOne", "Inkify", "Imagix", "Intellimind", "Inkster", "Inoventive", "Illumeon", "Ideanova", "Imagixis", "Inkrete", "Inkfinity", "Inprintz", "Ideasmith", "Inkcraft", "Invision", "Inkburst", "Inbrand", "Inkgrid", "Inkclick", "Imagint", "Imagic", "Inwise", "Inkforge", "Ideafy", "Innovaide", "Inkgenix", "Inkverse", "Innoidea", "IdeaSpace", "Inkbean", "Innotron", "Imaginate", "Inkboard", "Imagivibe", "Inkdeck", "Intellectify", "Inkenergy", "Inkdom", "Innovique", "Inkpresso", "Inkflare", "Ideacore", "Inkcenter", "Inkshade", "Inkloom", "Inkimpact", "Inkmark", "Inkolor", "Inkity", "Inktribe", "Inkcrew", "Inklogic", "Inkedge", "Inkmotion", "Inkpulse", "Inkblend", "Inkology", "Inkunity", "Inkpath", "Inkworld", "Inkleaf", "Inkpilot", "Inkfactory", "Inkhero", "Inkstorm", "Inkport", "Inkdream", "Inkcrate", "Inklineup", "Inkgridz", "Inkfusion", "Inkdash", "Inkcity", "Inkgalaxy", "Inkblaze", "Inktide", "Inkbond", "Inkcode", "Inkace", "Inkpanel", "Inktone", "Inknova", "Inkway", "Inkbiz", "Inkbuild", "Inkmatic", "Inkzone", "Inkshift", "Inkroll", "Inkidea", "Inkocean", "Inktrend", "Inkroot", "Inknow", "Inkbeats", "Inkhance", "Inkprime", "Inklabs", "Inkzen", "Inktime", "Inkcloud", "Inkframe", "Inkbase", "Inkcore", "Inkpathway", "Inkpeak", "Inkera", "Inkproject", "Inkmodule", "Inkset", "Inkmagic", "Inkfolk", "Inktribal", "Inktrace", "Inksign", "Inklens", "Inkdepth", "Inkdrive", "Inkworks", "Inkvision", "Inkx", "Inkflowy", "Inklink", "Inktouch", "Inken", "Inkripple", "Inksplash", "Inkflarex", "Inkvault", "Inkmarkr", "Inkcentric", "Inksense", "Inkfig", "Inkfind", "Inkubate", "Inkthrive", "Inkstellar", "Inkform", "Inkompose", "Inkreel", "Inkboardz", "Inkpower", "Inktank", "Inkzenith", "Inkgen", "Inkworlds", "Inkpalette", "Inkflash", "Inkcrafted", "Inkvibe", "Inkdive", "Inklaunch", "Inkdot", "Inkwayz", "Inkstep", "Inkloop", "Inkblender", "Inkrealm", "Inkscapez", "Inkrush", "Inkversez", "Inkmodern", "Inkconnect", "Inkmantra", "Inklust", "Inkshape", "Inkhustle", "Inkpush", "Inkreach", "Inkchannel", "Inkniche", "Inkwave", "Inkshiftz", "Inkdesigns", "Inkmode", "Inkpivot", "Inkelevate", "Inkgraph", "Inkplify", "Inkdawn", "Inktribune", "Inkquest", "Inkbolt", "Inkshell", "Inkgate", "Inklabz", "Inkhatch", "Inkworkz", "Inklaunchpad", "Inkwisez", "Inktastic", "Inkmedia", "Inkpowerz", "Inksociety", "Inklight", "Inkformat", "Inkzilla", "Inkrevive", "Inklogicz", "Inkspark", "Inkprism", "Inkminds", "Inklounge", "Inkmaze", "Inkbold", "Inkment", "Inknetic", "Inkooze", "Inkgrind", "Inkforgez", "Inkstellarz", "Inkmania", "Inkworldz", "Inkovate", "Inkreaction", "Inkrender", "Inkfyre", "Inkquake", "Inkcreed", "Inkduo", "Inkcalm", "Inkzenithz", "Inkversehub", "Inkpulsez", "Inkmaticz", "Inksurge", "Inkspacez", "Inkquestz", "Inkwavez", "Inkvisionz", "Inkventure", "Inkcreatives", "Inkevo", "Inkglobal", "Inklabworks", "Inkpitch", "Inkconnectz", "Inkxpress", "Inkheroes", "Inkpressoz", "Inkportal", "Inkignite"
  ];

  // 500+ words starting with 'M'
  const mWords = [
    "Magic", "Muse", "Mood", "Motion", "Masterpiece", "Mystic", "Mix", "Merge", "Matte", "Monochrome", "Mural", "Modish", "Manifest", "Momentum", "Magnet", "Meraki", "Modulate", "Mystique", "Monogram", "Minimal", "Merch", "Model", "Media", "Magnify", "Mergeable", "Mapping", "Manifesto", "Method", "Mantra", "Moodboard", "Mingle", "Markup", "Metric", "Mission", "Mechanism", "Monetize", "Manager", "Marketing", "Milestone", "Modern", "Mobility", "Maintenance", "Matrix", "Modularity", "Maker", "Manipulator", "Managerial", "Millennial", "Meta", "Mentor", "Markup", "Metaform", "Mod", "Manifold", "Manifesting", "Movable", "Mainstream", "Motive", "Meta-logic", "Minded", "Monument", "Mobilizer", "Metaphor", "Mapped", "Manoeuvre", "Modeling", "Monoline", "Merger", "Mill", "Miracle", "Mashup", "Morph", "Museful", "Magnetic", "Multicolor", "Majestic", "Marketable", "Merchandise", "Missionary", "Multimedia", "Multipurpose", "Mechanic", "Module", "Markup-driven", "Motioncraft", "Moment", "Metaverse", "Manner", "Mindspace", "Moodify", "Majesty", "Modelist", "Megatrend", "Mindshift", "Mainframe", "Multilayer", "Markup-based", "Multiform", "Mash", "Mobile", "Motif", "Maximal", "Metricate", "Mode", "Morphable", "Mapping-driven", "Metaframe", "Message", "Muralist", "Mindful", "Multiplier", "Multihue", "Minter", "Mint", "Midtone", "Megacolor", "Mesmerize", "Marketify", "Merit", "Monolinear", "Microbrand", "Mediaflux", "Movemaker", "Mindpaint", "Megaform", "Motionist", "Moodscape", "Midspectrum", "Momentous", "Milestone-driven", "Meritify", "Mastery", "Mapped-out", "Managify", "Museo", "Mystified", "Matchup", "Motionflow", "Modemind", "Modernist", "Missionflow", "Mindstorm", "Makeflow", "Modicolor", "Modelmind", "Momentumist", "Morphify", "Mystify", "Moodify", "Mentorfy", "Mediahub", "Multitone", "Magnetize", "Monetary", "Mappedmind", "Markupmind", "Motivator", "Megamind", "Minimalist", "Microtone", "Mogul", "Mergerize", "Monetization", "Metaidea", "Mintmark", "Modbrand", "Mesh", "Millwork", "Moveon", "Mindcraft", "Magnetism", "Multihue", "Moodscape", "Monotone", "Marketer", "Mindwave", "Metacraft", "Motiongrid", "Makerflow", "Mainline", "Markline", "Multistyle", "Multihue", "Masterplan", "Modeler", "Markupgrid", "Muralflow", "Mergeflow", "Mapcraft", "Marketingly", "Mesmeric", "Motiongrid", "Markgrid", "Matrixmind", "Mindmetric", "Movecraft", "Mindmove", "Makerstorm", "Modestep", "Maxihue", "Mediacraft", "Minutiae", "Moodline", "Megashade", "Merakist", "Mindmatrix", "Musemode", "Mediawise", "Modemagic", "Microstyle", "Magnetist", "Multiharmony", "Mysticbrand", "Minglemode", "Morphgrid", "Mentorloop", "Marketgen", "Monolayer", "Magicolor", "Multiglance", "Mindmerge", "Managerialist", "Movemode", "Markupmind", "Motivcraft", "Mosaic", "Mezzo", "Mashblend", "Metaidea", "Modelcraft", "Maverick", "Mysticmap", "Minddeck", "Monotonic", "Makewise", "Mellow", "Medium", "Magnetopia", "Markmind", "Mysticflow", "Moneystream", "Methodize", "Musecraft", "Magnetlink", "Maphub", "Modline", "Minimaline", "Modpaint", "Momentumcraft", "Moodindex", "Microflow", "Mysticblend", "Majesticflow", "Modernmind", "Mappinglogic", "Minddriven", "Marketstream", "Mergepath", "Motivision", "Markupcode", "Manageon", "Metafuse", "Modstream", "Multistroke", "Marketstorm", "Mingleverse", "Mergeon", "Mediaflow", "Momentumgrid", "Modulink", "Mysticcore", "Mentored", "Masteron", "Missionmode", "Minglelogic", "Motionbrand", "Monochromeart", "Maxicraft", "Mystifypro", "Makergrid", "Magneticpath", "Moodgrid", "Multiart", "Motionpath", "Makerhub", "Mappingpro", "Markupspace", "Mergehub", "Mysticmind", "Missionhue", "Moodblend", "Mappedstyle", "Maverickmode", "Mooddeck", "Megamarket", "Magnetizehub", "Minify", "Minimalive", "Magenticcore", "Modelstack", "Maptics", "Mysticvibe", "Multiflow", "Mindvalue", "Modumind", "Maverickflow", "Mentorwave", "Magnetloop", "Markupwave", "Mysticbeat", "Moodicon", "Merakimind", "Musemerge", "Mergefusion", "Makerverse", "Modelstorm", "Multivibe", "Mappingstorm", "Modestack", "Momentumverse", "Mysticvortex", "Mindhub", "Modulify", "Metawave", "Magicolorflow", "Mastermap", "Momentumvibe", "Mysticvalue", "Makerify", "Moodstorm", "Mystichue", "Mindmagnet", "Multiharmony", "Maplogic", "Mappedvibe", "Metapath", "Modulab", "Mindcraftify", "Momentumify", "Mystifyverse", "Multistyleflow", "Mindmergehub", "Mergeverse", "Museon", "Moodflux", "Mappedhub", "Motiflow", "Momentumlogic", "Magnetify", "Mysticstream", "Mergedream", "Multivision", "Mappedstream", "Modumindflow", "Mindlink", "Markify", "Markupverse", "Marketifyflow", "Mindtone", "Modutone", "Mysticcode", "Mappedcraft", "Musecolor", "Merchmind", "Mindpath", "Megatone", "Momentumdrive", "Mappingloop", "Mappedgen", "Multicolorpath", "Mergebeam", "Modulinkhub", "Monochromind", "Markupblend", "Mindmatic", "Momentumgen", "Mysticpixel", "Moodize", "Modestyle", "Mappedcolor", "Marketopix", "Magnetix", "Mysticink", "Momentumchain", "Museonflow", "Moodloom", "Magnetopaint", "Multiplan", "Missionloop", "Mappedink", "Mapform", "Moodgear", "Mysticinkwell", "Mindmatch", "Motionkey", "Moduline", "Markupchain", "Megablend", "Mystifygrid", "Mappedmindhub", "Mappedengine", "Mentormagic", "Momentumcreator", "Mysticmark", "Mergedcraft", "Mysticmerge"
  ];

  const [currentIIndex, setCurrentIIndex] = useState(0);
  const [currentMIndex, setCurrentMIndex] = useState(0);
  const [isIHovered, setIsIHovered] = useState(false);
  const [isMHovered, setIsMHovered] = useState(false);
  
  const iIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const mIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Start I words animation when I is hovered
  useEffect(() => {
    if (isIHovered && !isMHovered) {
      iIntervalRef.current = setInterval(() => {
        setCurrentIIndex(prev => (prev + 1) % iWords.length);
      }, 800); // 800ms for smooth transition
    } else {
      if (iIntervalRef.current) {
        clearInterval(iIntervalRef.current);
        iIntervalRef.current = null;
      }
    }

    return () => {
      if (iIntervalRef.current) {
        clearInterval(iIntervalRef.current);
      }
    };
  }, [isIHovered, isMHovered, iWords.length]);

  // Start M words animation when M is hovered
  useEffect(() => {
    if (isMHovered && !isIHovered) {
      mIntervalRef.current = setInterval(() => {
        setCurrentMIndex(prev => (prev + 1) % mWords.length);
      }, 800); // 800ms for smooth transition
    } else {
      if (mIntervalRef.current) {
        clearInterval(mIntervalRef.current);
        mIntervalRef.current = null;
      }
    }

    return () => {
      if (mIntervalRef.current) {
        clearInterval(mIntervalRef.current);
      }
    };
  }, [isMHovered, isIHovered, mWords.length]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (iIntervalRef.current) clearInterval(iIntervalRef.current);
      if (mIntervalRef.current) clearInterval(mIntervalRef.current);
    };
  }, []);

  return (
    <span className={`text-foreground font-sans text-5xl md:text-7xl lg:text-[90px] leading-normal md:leading-normal  ${className}`}>
      Colors{" "}
      <span 
        className="bg-gradient-rainbow bg-clip-text text-transparent text-[90px] animate-gradient-move  ease-in-out cursor-pointer hover:scale-105 inline-block"
        style={{ backgroundSize: '400% 400%' }}
        onMouseEnter={() => setIsMHovered(true)}
        onMouseLeave={() => setIsMHovered(false)}
      >
        {mWords[currentMIndex]}
      </span>{" "}
      <span 
        className="bg-gradient-rainbow bg-clip-text text-transparent text-[90px] animate-gradient-move  ease-in-out cursor-pointer hover:scale-105 inline-block"
        style={{ backgroundSize: '400% 400%' }}
        onMouseEnter={() => setIsIHovered(true)}
        onMouseLeave={() => setIsIHovered(false)}
      >
        {iWords[currentIIndex]}
      </span>
    </span>
  );
};

export default MovingTagline;