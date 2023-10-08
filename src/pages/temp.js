const [visitorCount, setVisitorCount] = useState('Loading...');

const [showInfo, setShowInfo] = useState(false);

const handleMouseEnter = () => {
  setShowInfo(true);
};

const handleMouseLeave = () => {
  setShowInfo(false);
};
useEffect(() => {
  async function getVisitorCount() {
    const hasCookie = document.cookie.includes('lastVisited');

    if (hasCookie) {
      const response = await fetch(
        `https://cloud.amanthakkar.com/api/old-visitor`
      );
      const data = await response.json();
      setVisitorCount(data.count);
    } else {
      // grab the source from the url, if any
      const urlParams = new URLSearchParams(window.location.search);
      const sourceParam = urlParams.get('source');

      const response = await fetch(
        `https://cloud.amanthakkar.com/api/new-visitor/?source=${sourceParam}`
      );
      const data = await response.json();
      setVisitorCount(data.count);
    }

    const expirationTime = new Date();
    expirationTime.setTime(expirationTime.getTime() + 3 * 60 * 1000); // 3 minutes
    document.cookie = `lastVisited=true; expires=${expirationTime.toUTCString()}`;
  }
  getVisitorCount();
}, []);
