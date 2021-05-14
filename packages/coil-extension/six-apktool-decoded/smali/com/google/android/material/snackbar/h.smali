.class Lcom/google/android/material/snackbar/h;
.super Ljava/lang/Object;
.source ""


# annotations
.annotation system Ldalvik/annotation/MemberClasses;
    value = {
        Lcom/google/android/material/snackbar/h$b;,
        Lcom/google/android/material/snackbar/h$a;
    }
.end annotation


# static fields
.field private static a:Lcom/google/android/material/snackbar/h;


# instance fields
.field private final b:Ljava/lang/Object;

.field private final c:Landroid/os/Handler;

.field private d:Lcom/google/android/material/snackbar/h$b;

.field private e:Lcom/google/android/material/snackbar/h$b;


# direct methods
.method private constructor <init>()V
    .locals 3

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    new-instance v0, Ljava/lang/Object;

    invoke-direct {v0}, Ljava/lang/Object;-><init>()V

    iput-object v0, p0, Lcom/google/android/material/snackbar/h;->b:Ljava/lang/Object;

    new-instance v0, Landroid/os/Handler;

    invoke-static {}, Landroid/os/Looper;->getMainLooper()Landroid/os/Looper;

    move-result-object v1

    new-instance v2, Lcom/google/android/material/snackbar/g;

    invoke-direct {v2, p0}, Lcom/google/android/material/snackbar/g;-><init>(Lcom/google/android/material/snackbar/h;)V

    invoke-direct {v0, v1, v2}, Landroid/os/Handler;-><init>(Landroid/os/Looper;Landroid/os/Handler$Callback;)V

    iput-object v0, p0, Lcom/google/android/material/snackbar/h;->c:Landroid/os/Handler;

    return-void
.end method

.method static a()Lcom/google/android/material/snackbar/h;
    .locals 1

    sget-object v0, Lcom/google/android/material/snackbar/h;->a:Lcom/google/android/material/snackbar/h;

    if-nez v0, :cond_0

    new-instance v0, Lcom/google/android/material/snackbar/h;

    invoke-direct {v0}, Lcom/google/android/material/snackbar/h;-><init>()V

    sput-object v0, Lcom/google/android/material/snackbar/h;->a:Lcom/google/android/material/snackbar/h;

    :cond_0
    sget-object v0, Lcom/google/android/material/snackbar/h;->a:Lcom/google/android/material/snackbar/h;

    return-object v0
.end method

.method private a(Lcom/google/android/material/snackbar/h$b;I)Z
    .locals 2

    iget-object v0, p1, Lcom/google/android/material/snackbar/h$b;->a:Ljava/lang/ref/WeakReference;

    invoke-virtual {v0}, Ljava/lang/ref/WeakReference;->get()Ljava/lang/Object;

    move-result-object v0

    check-cast v0, Lcom/google/android/material/snackbar/h$a;

    if-eqz v0, :cond_0

    iget-object v1, p0, Lcom/google/android/material/snackbar/h;->c:Landroid/os/Handler;

    invoke-virtual {v1, p1}, Landroid/os/Handler;->removeCallbacksAndMessages(Ljava/lang/Object;)V

    invoke-interface {v0, p2}, Lcom/google/android/material/snackbar/h$a;->a(I)V

    const/4 p1, 0x1

    return p1

    :cond_0
    const/4 p1, 0x0

    return p1
.end method

.method private b(Lcom/google/android/material/snackbar/h$b;)V
    .locals 4

    iget v0, p1, Lcom/google/android/material/snackbar/h$b;->b:I

    const/4 v1, -0x2

    if-ne v0, v1, :cond_0

    return-void

    :cond_0
    const/16 v1, 0xabe

    if-lez v0, :cond_1

    goto :goto_0

    :cond_1
    const/4 v2, -0x1

    if-ne v0, v2, :cond_2

    const/16 v0, 0x5dc

    goto :goto_0

    :cond_2
    move v0, v1

    :goto_0
    iget-object v1, p0, Lcom/google/android/material/snackbar/h;->c:Landroid/os/Handler;

    invoke-virtual {v1, p1}, Landroid/os/Handler;->removeCallbacksAndMessages(Ljava/lang/Object;)V

    iget-object v1, p0, Lcom/google/android/material/snackbar/h;->c:Landroid/os/Handler;

    const/4 v2, 0x0

    invoke-static {v1, v2, p1}, Landroid/os/Message;->obtain(Landroid/os/Handler;ILjava/lang/Object;)Landroid/os/Message;

    move-result-object p1

    int-to-long v2, v0

    invoke-virtual {v1, p1, v2, v3}, Landroid/os/Handler;->sendMessageDelayed(Landroid/os/Message;J)Z

    return-void
.end method

.method private c(Lcom/google/android/material/snackbar/h$a;)Z
    .locals 1

    iget-object v0, p0, Lcom/google/android/material/snackbar/h;->d:Lcom/google/android/material/snackbar/h$b;

    if-eqz v0, :cond_0

    invoke-virtual {v0, p1}, Lcom/google/android/material/snackbar/h$b;->a(Lcom/google/android/material/snackbar/h$a;)Z

    move-result p1

    if-eqz p1, :cond_0

    const/4 p1, 0x1

    goto :goto_0

    :cond_0
    const/4 p1, 0x0

    :goto_0
    return p1
.end method


# virtual methods
.method public a(Lcom/google/android/material/snackbar/h$a;)V
    .locals 2

    iget-object v0, p0, Lcom/google/android/material/snackbar/h;->b:Ljava/lang/Object;

    monitor-enter v0

    :try_start_0
    invoke-direct {p0, p1}, Lcom/google/android/material/snackbar/h;->c(Lcom/google/android/material/snackbar/h$a;)Z

    move-result p1

    if-eqz p1, :cond_0

    iget-object p1, p0, Lcom/google/android/material/snackbar/h;->d:Lcom/google/android/material/snackbar/h$b;

    iget-boolean p1, p1, Lcom/google/android/material/snackbar/h$b;->c:Z

    if-nez p1, :cond_0

    iget-object p1, p0, Lcom/google/android/material/snackbar/h;->d:Lcom/google/android/material/snackbar/h$b;

    const/4 v1, 0x1

    iput-boolean v1, p1, Lcom/google/android/material/snackbar/h$b;->c:Z

    iget-object p1, p0, Lcom/google/android/material/snackbar/h;->c:Landroid/os/Handler;

    iget-object v1, p0, Lcom/google/android/material/snackbar/h;->d:Lcom/google/android/material/snackbar/h$b;

    invoke-virtual {p1, v1}, Landroid/os/Handler;->removeCallbacksAndMessages(Ljava/lang/Object;)V

    :cond_0
    monitor-exit v0

    return-void

    :catchall_0
    move-exception p1

    monitor-exit v0
    :try_end_0
    .catchall {:try_start_0 .. :try_end_0} :catchall_0

    throw p1
.end method

.method a(Lcom/google/android/material/snackbar/h$b;)V
    .locals 2

    iget-object v0, p0, Lcom/google/android/material/snackbar/h;->b:Ljava/lang/Object;

    monitor-enter v0

    :try_start_0
    iget-object v1, p0, Lcom/google/android/material/snackbar/h;->d:Lcom/google/android/material/snackbar/h$b;

    if-eq v1, p1, :cond_0

    iget-object v1, p0, Lcom/google/android/material/snackbar/h;->e:Lcom/google/android/material/snackbar/h$b;

    if-ne v1, p1, :cond_1

    :cond_0
    const/4 v1, 0x2

    invoke-direct {p0, p1, v1}, Lcom/google/android/material/snackbar/h;->a(Lcom/google/android/material/snackbar/h$b;I)Z

    :cond_1
    monitor-exit v0

    return-void

    :catchall_0
    move-exception p1

    monitor-exit v0
    :try_end_0
    .catchall {:try_start_0 .. :try_end_0} :catchall_0

    throw p1
.end method

.method public b(Lcom/google/android/material/snackbar/h$a;)V
    .locals 2

    iget-object v0, p0, Lcom/google/android/material/snackbar/h;->b:Ljava/lang/Object;

    monitor-enter v0

    :try_start_0
    invoke-direct {p0, p1}, Lcom/google/android/material/snackbar/h;->c(Lcom/google/android/material/snackbar/h$a;)Z

    move-result p1

    if-eqz p1, :cond_0

    iget-object p1, p0, Lcom/google/android/material/snackbar/h;->d:Lcom/google/android/material/snackbar/h$b;

    iget-boolean p1, p1, Lcom/google/android/material/snackbar/h$b;->c:Z

    if-eqz p1, :cond_0

    iget-object p1, p0, Lcom/google/android/material/snackbar/h;->d:Lcom/google/android/material/snackbar/h$b;

    const/4 v1, 0x0

    iput-boolean v1, p1, Lcom/google/android/material/snackbar/h$b;->c:Z

    iget-object p1, p0, Lcom/google/android/material/snackbar/h;->d:Lcom/google/android/material/snackbar/h$b;

    invoke-direct {p0, p1}, Lcom/google/android/material/snackbar/h;->b(Lcom/google/android/material/snackbar/h$b;)V

    :cond_0
    monitor-exit v0

    return-void

    :catchall_0
    move-exception p1

    monitor-exit v0
    :try_end_0
    .catchall {:try_start_0 .. :try_end_0} :catchall_0

    throw p1
.end method
