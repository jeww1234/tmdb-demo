# 📌 새로 배운 점 정리

## 1. 🔐 API 키 보안 문제

### 문제점
API 키를 GitHub에 그대로 업로드하면 누구나 확인할 수 있어 보안에 매우 취약하다.

### 해결 방법
- `config.js` 또는 `.env` 파일에 API 키를 분리한다.
- `.gitignore`에 해당 파일을 추가하여 GitHub에 업로드되지 않도록 한다.

---

## 2. 🚀 Vercel 배포 시 환경 변수

### Vercel에서 제공하는 기능
Vercel은 **환경 변수(Environment Variables)** 를 등록하여 배포 시 안전하게 사용할 수 있다.

### 제약 사항
순수 **HTML / CSS / JavaScript** 프로젝트에서는 다음과 같이 사용할 수 없다.

```javascript
process.env.API_KEY
```

### 이유
환경 변수는 다음과 같은 환경에서만 코드에 주입된다.

- Vite
- Next.js
- Create React App(CRA)
- Node.js 런타임

즉, 정적 HTML 프로젝트는 `process.env`를 해석하지 못한다.

### 결론
> **순수 HTML 프로젝트에서는 Vercel 환경 변수를 직접 사용할 수 없다.**

---

## 3. 🛠️ 해결 방법 선택지

| 방법 | 장점 | 단점 |
|------|------|------|
| **빠른 해결 (데모용)** | `config.js`를 GitHub에 올려 바로 동작 | API 키 노출 위험 |
| **안전한 해결 (실서비스용)** | Vite / Next.js + `.env` + Vercel 환경 변수 사용 | 빌드 환경이 필요 |
| **최고의 보안** | 서버 프록시에서 API 키 관리 | 서버 구축 필요 |

---

# 🚀 핵심 정리

- ❌ API 키를 GitHub에 올리면 보안상 매우 위험하다.
- ✅ API 키는 `.env` 또는 `config.js`로 분리하고 Git에서 제외한다.
- ❌ 순수 HTML/JS 프로젝트는 Vercel 환경 변수를 직접 사용할 수 없다.
- ✅ 환경 변수를 사용하려면 **Vite**, **Next.js** 등의 빌드 도구가 필요하다.
- 🛡️ 가장 안전한 방법은 **서버에서만 API 키를 관리하는 것**이다.