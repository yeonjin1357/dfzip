import Image from "next/image";
import Link from "next/link";

import classes from "../styles/header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.header_wrap}>
        <div>
          <div className={classes.head_logo}>
            <Link href="/">
              <Image src="/images/logow.svg" width={120} height={0} alt="로고 이미지"></Image>
            </Link>
          </div>
          <div className={classes.dnf_logo}>
            <Link href="https://df.nexon.com" target="_blank">
              <Image src="/images/dnf_logo.webp" width={80} height={0} alt="던파 로고"></Image>
            </Link>
          </div>
        </div>
      </div>
      <nav className={classes.menu_bar}>
        <div>
          <ul className={classes.menu}>
            <li>
              <Link href="/">메인</Link>
            </li>
            <li>
              <Link href="/">캐릭터</Link>
            </li>
            <li>
              <Link href="/">랭킹</Link>
            </li>
            <li>
              <Link href="/">경매장</Link>
            </li>
            <li>
              <Link href="/">이벤트</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
