.class La/n/ha$a;
.super Landroid/animation/AnimatorListenerAdapter;
.source ""

# interfaces
.implements La/n/E$c;
.implements La/n/a$a;


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = La/n/ha;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0xa
    name = "a"
.end annotation


# instance fields
.field private final a:Landroid/view/View;

.field private final b:I

.field private final c:Landroid/view/ViewGroup;

.field private final d:Z

.field private e:Z

.field f:Z


# direct methods
.method constructor <init>(Landroid/view/View;IZ)V
    .locals 1

    invoke-direct {p0}, Landroid/animation/AnimatorListenerAdapter;-><init>()V

    const/4 v0, 0x0

    iput-boolean v0, p0, La/n/ha$a;->f:Z

    iput-object p1, p0, La/n/ha$a;->a:Landroid/view/View;

    iput p2, p0, La/n/ha$a;->b:I

    invoke-virtual {p1}, Landroid/view/View;->getParent()Landroid/view/ViewParent;

    move-result-object p1

    check-cast p1, Landroid/view/ViewGroup;

    iput-object p1, p0, La/n/ha$a;->c:Landroid/view/ViewGroup;

    iput-boolean p3, p0, La/n/ha$a;->d:Z

    const/4 p1, 0x1

    invoke-direct {p0, p1}, La/n/ha$a;->a(Z)V

    return-void
.end method

.method private a()V
    .locals 2

    iget-boolean v0, p0, La/n/ha$a;->f:Z

    if-nez v0, :cond_0

    iget-object v0, p0, La/n/ha$a;->a:Landroid/view/View;

    iget v1, p0, La/n/ha$a;->b:I

    invoke-static {v0, v1}, La/n/ba;->a(Landroid/view/View;I)V

    iget-object v0, p0, La/n/ha$a;->c:Landroid/view/ViewGroup;

    if-eqz v0, :cond_0

    invoke-virtual {v0}, Landroid/view/ViewGroup;->invalidate()V

    :cond_0
    const/4 v0, 0x0

    invoke-direct {p0, v0}, La/n/ha$a;->a(Z)V

    return-void
.end method

.method private a(Z)V
    .locals 1

    iget-boolean v0, p0, La/n/ha$a;->d:Z

    if-eqz v0, :cond_0

    iget-boolean v0, p0, La/n/ha$a;->e:Z

    if-eq v0, p1, :cond_0

    iget-object v0, p0, La/n/ha$a;->c:Landroid/view/ViewGroup;

    if-eqz v0, :cond_0

    iput-boolean p1, p0, La/n/ha$a;->e:Z

    invoke-static {v0, p1}, La/n/S;->a(Landroid/view/ViewGroup;Z)V

    :cond_0
    return-void
.end method


# virtual methods
.method public a(La/n/E;)V
    .locals 0

    return-void
.end method

.method public b(La/n/E;)V
    .locals 0

    const/4 p1, 0x0

    invoke-direct {p0, p1}, La/n/ha$a;->a(Z)V

    return-void
.end method

.method public c(La/n/E;)V
    .locals 0

    invoke-direct {p0}, La/n/ha$a;->a()V

    invoke-virtual {p1, p0}, La/n/E;->b(La/n/E$c;)La/n/E;

    return-void
.end method

.method public d(La/n/E;)V
    .locals 0

    const/4 p1, 0x1

    invoke-direct {p0, p1}, La/n/ha$a;->a(Z)V

    return-void
.end method

.method public onAnimationCancel(Landroid/animation/Animator;)V
    .locals 0

    const/4 p1, 0x1

    iput-boolean p1, p0, La/n/ha$a;->f:Z

    return-void
.end method

.method public onAnimationEnd(Landroid/animation/Animator;)V
    .locals 0

    invoke-direct {p0}, La/n/ha$a;->a()V

    return-void
.end method

.method public onAnimationPause(Landroid/animation/Animator;)V
    .locals 1

    iget-boolean p1, p0, La/n/ha$a;->f:Z

    if-nez p1, :cond_0

    iget-object p1, p0, La/n/ha$a;->a:Landroid/view/View;

    iget v0, p0, La/n/ha$a;->b:I

    invoke-static {p1, v0}, La/n/ba;->a(Landroid/view/View;I)V

    :cond_0
    return-void
.end method

.method public onAnimationRepeat(Landroid/animation/Animator;)V
    .locals 0

    return-void
.end method

.method public onAnimationResume(Landroid/animation/Animator;)V
    .locals 1

    iget-boolean p1, p0, La/n/ha$a;->f:Z

    if-nez p1, :cond_0

    iget-object p1, p0, La/n/ha$a;->a:Landroid/view/View;

    const/4 v0, 0x0

    invoke-static {p1, v0}, La/n/ba;->a(Landroid/view/View;I)V

    :cond_0
    return-void
.end method

.method public onAnimationStart(Landroid/animation/Animator;)V
    .locals 0

    return-void
.end method
