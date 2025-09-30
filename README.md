# DogApp

## Установка

```bash
npm install
```

## Разработка с live reload

### 1. Запустить dev-сервер

```bash
npm run dev -- --host=0.0.0.0
```

### 2. Открыть в эмуляторах

```bash
# iOS
npx cap open ios

# Android
npx cap open android
```

### 3. Настройка IP в конфиге

В `capacitor.config.ts` укажите ваш локальный IP:

```typescript
server: {
  url: "http://192.168.0.119:5173",
  cleartext: true,
}
```

## Сборка для продакшена

### 1. Убрать server из конфига

```typescript
// Закомментировать или удалить
// server: {
//   url: "http://192.168.0.119:5173",
//   cleartext: true,
// }
```

### 2. Собрать и синхронизировать

```bash
npm run build
npx cap sync
```

### 3. Сборка в IDE

**iOS (Xcode):**

- Product → Build (⌘+B)
- Product → Archive для App Store

**Android (Android Studio):**

- Build → Make Project
- Build → Generate Signed Bundle/APK для Play Store

## Возможные проблемы

**iOS sandbox ошибка:**

```bash
chmod +x "Pods/Target Support Files/Pods-App/Pods-App-frameworks.sh"
```

**Android/iOS не видит изменения:**

```bash
npx cap sync
```
