.class La/j/a/i$a;
.super La/j/a/l;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = La/j/a/i;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = "a"
.end annotation

.annotation system Ldalvik/annotation/Signature;
    value = {
        "La/j/a/l<",
        "La/j/a/i;",
        ">;"
    }
.end annotation


# instance fields
.field final synthetic f:La/j/a/i;


# direct methods
.method public constructor <init>(La/j/a/i;)V
    .locals 0

    iput-object p1, p0, La/j/a/i$a;->f:La/j/a/i;

    invoke-direct {p0, p1}, La/j/a/l;-><init>(La/j/a/i;)V

    return-void
.end method


# virtual methods
.method public a(I)Landroid/view/View;
    .locals 1

    iget-object v0, p0, La/j/a/i$a;->f:La/j/a/i;

    invoke-virtual {v0, p1}, Landroid/app/Activity;->findViewById(I)Landroid/view/View;

    move-result-object p1

    return-object p1
.end method

.method public a(La/j/a/g;)V
    .locals 1

    iget-object v0, p0, La/j/a/i$a;->f:La/j/a/i;

    invoke-virtual {v0, p1}, La/j/a/i;->a(La/j/a/g;)V

    return-void
.end method

.method public a(Ljava/lang/String;Ljava/io/FileDescriptor;Ljava/io/PrintWriter;[Ljava/lang/String;)V
    .locals 1

    iget-object v0, p0, La/j/a/i$a;->f:La/j/a/i;

    invoke-virtual {v0, p1, p2, p3, p4}, La/j/a/i;->dump(Ljava/lang/String;Ljava/io/FileDescriptor;Ljava/io/PrintWriter;[Ljava/lang/String;)V

    return-void
.end method

.method public a()Z
    .locals 1

    iget-object v0, p0, La/j/a/i$a;->f:La/j/a/i;

    invoke-virtual {v0}, Landroid/app/Activity;->getWindow()Landroid/view/Window;

    move-result-object v0

    if-eqz v0, :cond_0

    invoke-virtual {v0}, Landroid/view/Window;->peekDecorView()Landroid/view/View;

    move-result-object v0

    if-eqz v0, :cond_0

    const/4 v0, 0x1

    goto :goto_0

    :cond_0
    const/4 v0, 0x0

    :goto_0
    return v0
.end method

.method public b(La/j/a/g;)Z
    .locals 0

    iget-object p1, p0, La/j/a/i$a;->f:La/j/a/i;

    invoke-virtual {p1}, Landroid/app/Activity;->isFinishing()Z

    move-result p1

    if-nez p1, :cond_0

    const/4 p1, 0x1

    goto :goto_0

    :cond_0
    const/4 p1, 0x0

    :goto_0
    return p1
.end method

.method public f()Landroid/view/LayoutInflater;
    .locals 2

    iget-object v0, p0, La/j/a/i$a;->f:La/j/a/i;

    invoke-virtual {v0}, Landroid/app/Activity;->getLayoutInflater()Landroid/view/LayoutInflater;

    move-result-object v0

    iget-object v1, p0, La/j/a/i$a;->f:La/j/a/i;

    invoke-virtual {v0, v1}, Landroid/view/LayoutInflater;->cloneInContext(Landroid/content/Context;)Landroid/view/LayoutInflater;

    move-result-object v0

    return-object v0
.end method

.method public g()I
    .locals 1

    iget-object v0, p0, La/j/a/i$a;->f:La/j/a/i;

    invoke-virtual {v0}, Landroid/app/Activity;->getWindow()Landroid/view/Window;

    move-result-object v0

    if-nez v0, :cond_0

    const/4 v0, 0x0

    goto :goto_0

    :cond_0
    invoke-virtual {v0}, Landroid/view/Window;->getAttributes()Landroid/view/WindowManager$LayoutParams;

    move-result-object v0

    iget v0, v0, Landroid/view/WindowManager$LayoutParams;->windowAnimations:I

    :goto_0
    return v0
.end method

.method public h()Z
    .locals 1

    iget-object v0, p0, La/j/a/i$a;->f:La/j/a/i;

    invoke-virtual {v0}, Landroid/app/Activity;->getWindow()Landroid/view/Window;

    move-result-object v0

    if-eqz v0, :cond_0

    const/4 v0, 0x1

    goto :goto_0

    :cond_0
    const/4 v0, 0x0

    :goto_0
    return v0
.end method

.method public i()V
    .locals 1

    iget-object v0, p0, La/j/a/i$a;->f:La/j/a/i;

    invoke-virtual {v0}, La/j/a/i;->g()V

    return-void
.end method
