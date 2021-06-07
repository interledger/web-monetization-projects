.class La/j/a/h;
.super Landroid/os/Handler;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = La/j/a/i;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic a:La/j/a/i;


# direct methods
.method constructor <init>(La/j/a/i;)V
    .locals 0

    iput-object p1, p0, La/j/a/h;->a:La/j/a/i;

    invoke-direct {p0}, Landroid/os/Handler;-><init>()V

    return-void
.end method


# virtual methods
.method public handleMessage(Landroid/os/Message;)V
    .locals 2

    iget v0, p1, Landroid/os/Message;->what:I

    const/4 v1, 0x2

    if-eq v0, v1, :cond_0

    invoke-super {p0, p1}, Landroid/os/Handler;->handleMessage(Landroid/os/Message;)V

    goto :goto_0

    :cond_0
    iget-object p1, p0, La/j/a/h;->a:La/j/a/i;

    invoke-virtual {p1}, La/j/a/i;->e()V

    iget-object p1, p0, La/j/a/h;->a:La/j/a/i;

    iget-object p1, p1, La/j/a/i;->d:La/j/a/k;

    invoke-virtual {p1}, La/j/a/k;->i()Z

    :goto_0
    return-void
.end method
