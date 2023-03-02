import { useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import {
  FluentProvider,
  webDarkTheme,
  Tab,
  TabList,
  ProgressBar,
  makeStyles,
  typographyStyles,
  Button,
  Link,
} from '@fluentui/react-components';
import {
  ArrowLeft20Filled,
  Shield24Regular,
  History24Filled,
  Navigation20Filled,
  Home24Regular,
  Maximize20Regular,
  Dismiss20Regular,
  Subtract20Regular,
  Person24Regular,
  Router24Regular,
} from '@fluentui/react-icons';
import './App.css';
import files from './files';
import directories from './directories';

const useStyles = makeStyles({
  title2: typographyStyles.body1,
});

const getDirectoriesCopy = () => directories.slice(0, 3);

function Home() {
  const [currentPercent, setCurrentPercent] = useState(0);
  const [scanning, setScanning] = useState(false);
  const [totalFilesScanned, setTotalFilesScanned] = useState(0);
  const [currentFilePath, setCurrentFilePath] = useState(
    'C:\\windows\\system32'
  );
  const [endTime, setEndtime] = useState(new Date().getTime() + 10 * 1000 * 60);
  const [lastScanDate, setLastScanDate] = useState(null);
  const [totalScanTime, setTotalScanTime] = useState(0);
  const styles = useStyles();

  useEffect(() => {
    if (!scanning) return;
    const timeoutid = setTimeout(() => {
      setCurrentPercent((prev) => (prev < 98 ? prev + 1 : 40));
    }, 500);
    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timeoutid);
  }, [scanning, currentPercent]);

  useEffect(() => {
    if (!scanning) return;
    const directoriesCopy = getDirectoriesCopy();
    let currentDirectory = directoriesCopy.shift();
    let totalFilesInDirectory = 0;
    let maxTotalFiles = 50 + Math.floor(50 * Math.random());
    const setRandomFile = () => {
      if (!directoriesCopy.length) {
        setCurrentPercent(90);
        setTimeout(() => {
          setScanning(false);
          setTotalScanTime(new Date().getTime() - lastScanDate.getTime());
        }, 1000);
        return;
      }
      setTotalFilesScanned((prev) => prev + 1);
      totalFilesInDirectory += 1;
      const currentFile = files[Math.floor(Math.random() * files.length)];
      setCurrentFilePath(`${currentDirectory}\\${currentFile}`);
      const nextFileTime =
        Math.random() > 0.05 ? 25 + Math.floor(Math.random() * 200) : 1000;
      setTimeout(() => {
        setRandomFile();
      }, nextFileTime);
      if (totalFilesInDirectory >= maxTotalFiles) {
        currentDirectory = directoriesCopy.shift();
        totalFilesInDirectory = 0;
        maxTotalFiles = 50 + Math.floor(50 * Math.random());
      }
      if (Math.random() > 0.9) {
        if (Math.random() > 0.1) {
          setEndtime((prev) => prev - 3000);
        } else {
          setEndtime((prev) => prev + 10_000);
        }
      }
    };
    setRandomFile();
  }, [scanning]);
  const timeRemaining = endTime - new Date().getTime();
  return (
    <div className="home">
      <div className="left-sidebar">
        <ArrowLeft20Filled />
        <br />
        <Navigation20Filled />
        <TabList className="tabs" defaultSelectedValue="tab2" vertical>
          <Tab value="tab1">
            <div className="menu-icon-label">
              <Home24Regular />
              <span>Home</span>
            </div>
          </Tab>
          <Tab value="tab2">
            <div className="menu-icon-label">
              <Shield24Regular />
              <span>Virus & threat protection</span>
            </div>
          </Tab>
          <Tab value="tab3">
            <div className="menu-icon-label">
              <Person24Regular />
              <span>Account Protection</span>
            </div>
          </Tab>
          <Tab value="tab4">
            <div className="menu-icon-label">
              <Router24Regular />
              <span>Firewall & Network Protection</span>
            </div>
          </Tab>
        </TabList>
      </div>
      <div className="main">
        <div>
          <span className="title">
            <Shield24Regular /> Virus & threat protection
          </span>
        </div>
        <div className={styles.title2}>
          Protection for your device against threats.
        </div>
        {!scanning && (
          <div>
            <p>
              <History24Filled /> Current threats
            </p>
            <p className="info">No current threats.</p>
            <p className="info">
              Last scan:{' '}
              {lastScanDate
                ? lastScanDate.toLocaleString()
                : '04/20/2022 4:20 PM'}{' '}
              (quick scan)
            </p>
            <p className="info">69 threats found.</p>
            <p className="info">
              Scan lasted{' '}
              {totalScanTime
                ? Math.floor(totalScanTime / 1000 / 60)
                    .toString()
                    .padStart(2, '0')
                : 4}{' '}
              minutes{' '}
              {totalScanTime
                ? Math.floor((totalScanTime / 1000) % 60)
                    .toString()
                    .padStart(2, '0')
                : 20}{' '}
              seconds.
            </p>
            <p className="info">{totalFilesScanned || 69420} files scanned.</p>
          </div>
        )}
        {scanning && (
          <div>
            <p>
              <History24Filled /> Current threats
            </p>
            <div className="scan-progress">
              <ProgressBar max={100} value={currentPercent} />
              <p>{currentFilePath}</p>
            </div>
            <p className="info">Quick scan running...</p>
            <p className="info">
              Estimated time remaining: 00:
              {Math.floor(timeRemaining / 1000 / 60)
                .toString()
                .padStart(2, '0')}
              :
              {Math.floor((timeRemaining / 1000) % 60)
                .toString()
                .padStart(2, '0')}
            </p>
            <p className="info">{totalFilesScanned} files scanned.</p>
          </div>
        )}
        <div>
          {!scanning ? (
            <Button
              shape="square"
              size="large"
              onClick={() => {
                setEndtime(new Date().getTime() + 10 * 1000 * 60);
                setScanning(true);
                setLastScanDate(new Date());
              }}
            >
              Quick Scan
            </Button>
          ) : (
            <Button
              shape="square"
              size="large"
              onClick={() => setScanning(false)}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
      <div className="right-sidebar">
        <div>
          <span className="sidebar-question">Have a question?</span>
          <Link href="/">Get help</Link>
        </div>
        <div>
          <span className="sidebar-question">Who is protecting me?</span>
          <Link href="/">Manage providers</Link>
        </div>
        <div>
          <span className="sidebar-question">
            Help improve Windows Security
          </span>
          <Link href="/">Give us feedback</Link>
        </div>
        <div>
          <span className="sidebar-question">Change your privacy settings</span>
          <span className="info">
            View and change privacy settings for your Windows 11 Pro device.
          </span>
          <br />
          <Link href="/">Privacy settings</Link>
          <br />
          <Link href="/">Privacy dashboard</Link>
          <br />
          <Link href="/">Privacy Statement</Link>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <FluentProvider theme={webDarkTheme}>
      <div className="navbar">
        <div className="window-title">Windows Security</div>
        <div className="navbar-buttons">
          <Subtract20Regular />
          <Maximize20Regular />
          <Dismiss20Regular />
        </div>
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </FluentProvider>
  );
}
