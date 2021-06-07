.class La/g/f/i;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements Ljava/lang/Runnable;


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = La/g/f/k;->a(Ljava/util/concurrent/Callable;La/g/f/k$a;)V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic a:Ljava/util/concurrent/Callable;

.field final synthetic b:Landroid/os/Handler;

.field final synthetic c:La/g/f/k$a;

.field final synthetic d:La/g/f/k;


# direct methods
.method constructor <init>(La/g/f/k;Ljava/util/concurrent/Callable;Landroid/os/Handler;La/g/f/k$a;)V
    .locals 0

    iput-object p1, p0, La/g/f/i;->d:La/g/f/k;

    iput-object p2, p0, La/g/f/i;->a:Ljava/util/concurrent/Callable;

    iput-object p3, p0, La/g/f/i;->b:Landroid/os/Handler;

    iput-object p4, p0, La/g/f/i;->c:La/g/f/k$a;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public run()V
    .locals 3

    :try_start_0
    iget-object v0, p0, La/g/f/i;->a:Ljava/util/concurrent/Callable;

    invoke-interface {v0}, Ljava/util/concurrent/Callable;->call()Ljava/lang/Object;

    move-result-object v0
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0

    goto :goto_0

    :catch_0
    const/4 v0, 0x0

    :goto_0
    iget-object v1, p0, La/g/f/i;->b:Landroid/os/Handler;

    new-instance v2, La/g/f/h;

    invoke-direct {v2, p0, v0}, La/g/f/h;-><init>(La/g/f/i;Ljava/lang/Object;)V

    invoke-virtual {v1, v2}, Landroid/os/Handler;->post(Ljava/lang/Runnable;)Z

    return-void
.end method
