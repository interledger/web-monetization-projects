.class Lcom/samsung/android/sbrowser/ext/a;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements Landroid/os/Handler$Callback;


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Lcom/samsung/android/sbrowser/ext/ExContentProvider;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic a:Lcom/samsung/android/sbrowser/ext/ExContentProvider;


# direct methods
.method constructor <init>(Lcom/samsung/android/sbrowser/ext/ExContentProvider;)V
    .locals 0

    iput-object p1, p0, Lcom/samsung/android/sbrowser/ext/a;->a:Lcom/samsung/android/sbrowser/ext/ExContentProvider;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public handleMessage(Landroid/os/Message;)Z
    .locals 3

    iget p1, p1, Landroid/os/Message;->what:I

    const/4 v0, 0x1

    if-eq p1, v0, :cond_0

    goto :goto_0

    :cond_0
    iget-object p1, p0, Lcom/samsung/android/sbrowser/ext/a;->a:Lcom/samsung/android/sbrowser/ext/ExContentProvider;

    invoke-static {p1}, Lcom/samsung/android/sbrowser/ext/ExContentProvider;->a(Lcom/samsung/android/sbrowser/ext/ExContentProvider;)Ljava/lang/String;

    move-result-object p1

    if-nez p1, :cond_1

    const/4 p1, 0x0

    return p1

    :cond_1
    new-instance p1, Ljava/io/File;

    iget-object v1, p0, Lcom/samsung/android/sbrowser/ext/a;->a:Lcom/samsung/android/sbrowser/ext/ExContentProvider;

    invoke-virtual {v1}, Landroid/content/ContentProvider;->getContext()Landroid/content/Context;

    move-result-object v1

    invoke-virtual {v1}, Landroid/content/Context;->getFilesDir()Ljava/io/File;

    move-result-object v1

    iget-object v2, p0, Lcom/samsung/android/sbrowser/ext/a;->a:Lcom/samsung/android/sbrowser/ext/ExContentProvider;

    invoke-static {v2}, Lcom/samsung/android/sbrowser/ext/ExContentProvider;->a(Lcom/samsung/android/sbrowser/ext/ExContentProvider;)Ljava/lang/String;

    move-result-object v2

    invoke-direct {p1, v1, v2}, Ljava/io/File;-><init>(Ljava/io/File;Ljava/lang/String;)V

    invoke-virtual {p1}, Ljava/io/File;->exists()Z

    move-result v1

    if-eqz v1, :cond_2

    const-string v1, "ExContentProvider"

    const-string v2, "openFile clear file"

    invoke-static {v1, v2}, Landroid/util/Log;->v(Ljava/lang/String;Ljava/lang/String;)I

    invoke-virtual {p1}, Ljava/io/File;->delete()Z

    :cond_2
    iget-object p1, p0, Lcom/samsung/android/sbrowser/ext/a;->a:Lcom/samsung/android/sbrowser/ext/ExContentProvider;

    const/4 v1, 0x0

    invoke-static {p1, v1}, Lcom/samsung/android/sbrowser/ext/ExContentProvider;->a(Lcom/samsung/android/sbrowser/ext/ExContentProvider;Ljava/lang/String;)Ljava/lang/String;

    :goto_0
    return v0
.end method
